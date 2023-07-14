const { Record } = require("../../models");
const minioClient = require("../../middlewares/minioClient");

const { BUCKET_NAME, MINIO_ACCESS_KEY, MINIO_SECRET_KEY } = process.env;
const s3Client = minioClient({ MINIO_ACCESS_KEY, MINIO_SECRET_KEY });
const generateDownloadUrlById = async (req, res, next) => {
  try {
    const { recordId } = req.params;

    const record = { recordId };
    const result = await Record.findById(record.recordId);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: ` Record with ID=${record.recordId} not found`,
      });
      return;
    }
    await s3Client.presignedGetObject(
      BUCKET_NAME,
      result.voice_record_mp3,
      24 * 60 * 60,
      (err, url) => {
        if (err) {
          return console.log(err);
        }
        res.status(200).json({
          url,
        });
      }
    );
  } catch (error) {
    next(error);
  }
};
module.exports = generateDownloadUrlById;
