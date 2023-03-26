import fs from 'fs';
import mongoose from 'mongoose';
import CodecParser from 'codec-parser';
import { config } from 'dotenv';
import { Record } from '../models/index.js';
import ffmpeg from 'fluent-ffmpeg';

config();

const convertOpusToMp3 = async (input, output) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(input)
      .format('mp3')
      .on('start', () => {
        console.log(`Starting conversion from ${input} to ${output}`);
      })
      .on('progress', (progress) => {
        // console.log(`Progress: ${progress.percent.toFixed(2)}%`);
      })
      .on('end', () => {
        console.log(`Conversion completed: ${output}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error during conversion: ${err.message}`);
        reject(err);
      })
      .save(output);
  });
};

const { DB_HOST } = process.env;

mongoose.set('strictQuery', false);
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

        try {
          const fileBuffer = await fs.promises.readFile(outputMp3Filename);
          const mimeType = 'audio/mpeg';
          const options = {
            onCodec: () => {},
            onCodecUpdate: () => {},
            enableLogging: true,
          };

          const parser = new CodecParser(mimeType, options);
          const dur = parser
            .parseAll(fileBuffer)
            .map((f) => f.duration)
            .reduce((a, b) => a + b, 0);
          doc.duration = dur / 1000;
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