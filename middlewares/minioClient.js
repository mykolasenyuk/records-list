const Minio = require("minio");

module.exports = ({ MINIO_ACCESS_KEY, MINIO_SECRET_KEY }) => {
  return new Minio.Client({
    endPoint: "play.min.io",
    port: 9000,
    useSSL: true,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
  });
};
