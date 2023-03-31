const { Record } = require("../../models");
const { Conflict } = require("http-errors");
const convertOpusToMp3 = require("../../utils/convertOpusToMp3");
const fs = require("fs");
const minioClient = require("../../middlewares/minioClient");
const { v4 } = require("uuid");

const { BUCKET_NAME, MINIO_ACCESS_KEY, MINIO_SECRET_KEY } = process.env;
const s3Client = minioClient({ MINIO_ACCESS_KEY, MINIO_SECRET_KEY });

const addRecord = async (req, res, next) => {
  try {
    const { text } = req.body;
    const name = `${v4()}.mp3`;

    const existRecord = await Record.findOne({ text });
    if (existRecord) {
      throw new Conflict(`Record already exist`);
    }

    const wavData = Buffer.from(
      req.body.voice_record.replace("data:audio/webm;codecs=opus;base64,", ""),
      "base64"
    );

    const outputFilename = "output.wav";
    const outputMp3Filename = "output.mp3";

    fs.writeFileSync(outputFilename, wavData);
    await convertOpusToMp3(outputFilename, outputMp3Filename);

    const metaData = {
      "Content-Type": "application/octet-stream",
      "X-Amz-Meta-Testing": 1234,
      example: 5678,
    };

    await s3Client.fPutObject(
      BUCKET_NAME,
      name,
      outputFilename,
      metaData,
      function (err, etag) {
        if (err) return console.log(err);
        console.log("File uploaded successfully.");
      }
    );

    const newRecord = { ...req.body, voice_record_mp3: name };

    const result = await Record.create(newRecord);

    res.status(201).json({
      result,
    });
    // fs.unlinkSync(outputFilename);
    // fs.unlinkSync(outputMp3Filename);
  } catch (error) {
    next(error);
  }
};
module.exports = addRecord;
