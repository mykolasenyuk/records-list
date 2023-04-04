const { Record } = require("../../models");
const { Conflict } = require("http-errors");
const convertOpusToMp3 = require("../../utils/convertOpusToMp3");
const fs = require("fs");
const minioClient = require("../../middlewares/minioClient");
const { v4 } = require("uuid");
const { BUCKET_NAME, MINIO_ACCESS_KEY, MINIO_SECRET_KEY } = process.env;
const s3Client = minioClient({ MINIO_ACCESS_KEY, MINIO_SECRET_KEY });
const fromMp3toFlac = require("../../utils/fromMp3ToFlac");
const { getAudioDurationInSeconds } = require("get-audio-duration");

const addRecord = async (req, res, next) => {
  try {
    const { text } = req.body;
    const name = `${v4()}.mp3`;
    const existRecord = await Record.findOne({ text });
    if (existRecord) {
      throw new Conflict(`Record already exist`);
    }
    const outputFilename = "output.wav";
    const outputMp3Filename = "output.mp3";
    const outputFlacFilename = "output.flac";

    const metaData = {
      "Content-Type": "application/octet-stream",
      "X-Amz-Meta-Testing": 1234,
      example: 5678,
    };
    const isMp3 = req.body.voice_record.includes("data:audio/mpeg;");

    if (isMp3) {
      const buffer = Buffer.from(
        req.body.voice_record.replace("data:audio/mpeg;base64,", ""),
        "base64"
      );
      await fs.writeFileSync(outputMp3Filename, buffer);
      await fromMp3toFlac(outputMp3Filename, outputFlacFilename);
      const duration = await getAudioDurationInSeconds(outputFlacFilename);
      const newRecord = {
        ...req.body,
        voice_record_mp3: name,
        duration: duration,
      };
      const result = await Record.create(newRecord);

      res.status(201).json({
        result,
      });

      await s3Client.fPutObject(
        BUCKET_NAME,
        name,
        outputMp3Filename,
        metaData,
        function (err, etag) {
          if (err) return console.log(err);
          console.log("File uploaded successfully.");
        }
      );
    } else {
      const buffer = Buffer.from(
        req.body.voice_record.replace(
          "data:audio/webm;codecs=opus;base64,",
          ""
        ),
        "base64"
      );

      fs.writeFileSync(outputFilename, buffer);
      await convertOpusToMp3(outputFilename, outputMp3Filename);

      const newRecord = {
        ...req.body,
        voice_record_mp3: name,
      };
      const result = await Record.create(newRecord);

      res.status(201).json({
        result,
      });

      await s3Client.fPutObject(
        BUCKET_NAME,
        name,
        outputMp3Filename,
        metaData,
        function (err, etag) {
          if (err) return console.log(err);
          console.log("File uploaded successfully.");
        }
      );
    }
  } catch (error) {
    next(error);
  }
};
module.exports = addRecord;
