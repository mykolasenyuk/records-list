const ffmpeg = require('fluent-ffmpeg');
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
module.exports = convertOpusToMp3