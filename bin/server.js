const mongoose = require("mongoose");
require("dotenv").config();
const app = require("../app");
const minioConnect = require("../middlewares/minIOconnect");
const minioClient = require("../middlewares/minioClient");
const {
  DB_HOST,
  PORT = 3000,
  BUCKET_NAME,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
} = process.env;

mongoose.set("strictQuery", false);
const s3Client = minioClient({ MINIO_ACCESS_KEY, MINIO_SECRET_KEY });

minioConnect(s3Client, BUCKET_NAME);

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
  })
  .then(() => {
    app.listen(PORT);
    console.log(`Database connection successful on Port ${PORT}`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
