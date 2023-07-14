import fs from 'fs';
import mongoose from 'mongoose';
import CodecParser from 'codec-parser';
import { Record } from '../models/index.js';
import convertOpusToMp3 from "./convertOpusToMp3.js";

import * as dotenv from 'dotenv'
dotenv.config()
import { v4 } from 'uuid';
import minioConnect from "../middlewares/minIOconnect.js";
import minioClient from "../middlewares/minioClient.js";



const { DB_HOST,BUCKET_NAME,MINIO_ACCESS_KEY, MINIO_SECRET_KEY  } =process.env ;
const s3Client = minioClient({MINIO_ACCESS_KEY, MINIO_SECRET_KEY })
console.log(BUCKET_NAME);
mongoose.set('strictQuery', false);

const uploadFile = (bucketName, name, outputFilename, metaData) => {
  return new Promise((resolve, reject) => {
    s3Client.fPutObject(bucketName, name, outputFilename, metaData, (err, etag) => {
      if (err) {
        reject(err);
      } else {
        console.log("File uploaded successfully.");
        resolve(etag);
      }
    });
  });
};

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const getAllRecords = async () => {
  try {
    await minioConnect(s3Client, BUCKET_NAME)
    const cursor = Record.find().cursor();
    console.log('Start');

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      try {
        const wavData = Buffer.from(
          doc.voice_record.replace('data:audio/webm;codecs=opus;base64,', ''),
          'base64',
        );

        const outputFilename = 'output.wav';
        const outputMp3Filename = 'output.mp3';

        fs.writeFileSync(outputFilename, wavData);
        await convertOpusToMp3(outputFilename, outputMp3Filename);


        const metaData = {
          "Content-Type": "application/octet-stream",
          "X-Amz-Meta-Testing": 1234,
          example: 5678,
        };
        const name = `${v4()}.mp3`;

        try {
          const fileBuffer = await fs.promises.readFile(outputMp3Filename);
          const mimeType = 'audio/mpeg';
          const options = {
            onCodec: () => {},
            onCodecUpdate: () => {},
            enableLogging: true,
          };

          await uploadFile(BUCKET_NAME, name, outputFilename, metaData)

          const parser = new CodecParser(mimeType, options);
          const dur = parser
            .parseAll(fileBuffer)
            .map((f) => f.duration)
            .reduce((a, b) => a + b, 0);
          doc.duration = dur / 1000;
          doc.voice_record_mp3=name

          await doc.save();

        } catch (err) {
          console.error('Error reading MP3 file:', err);
        }
      } catch (e) {
        console.error('Error processing record:', e);
      }
    }
    console.log('End');
  } catch (error) {
    console.error(error);
  }
};

getAllRecords();