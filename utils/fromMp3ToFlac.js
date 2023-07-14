const ffmpeg = require("fluent-ffmpeg");
const fromMp3ToFlac = async (input, output) => {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(input)
      .format("flac")
      .on("start", () => {
        console.log(`Starting conversion from ${input} to ${output}`);
      })
      .on("progress", (progress) => {
        // console.log(`Progress: ${progress.percent.toFixed(2)}%`);
      })
      .on("end", () => {
        console.log(`Conversion completed: ${output}`);
        resolve();
      })
      .on("error", (err) => {
        console.error(`Error during conversion: ${err.message}`);
        reject(err);
      })
      .save(output);
  });
};
module.exports = fromMp3ToFlac;
