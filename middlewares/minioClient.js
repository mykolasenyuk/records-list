const Minio = require("minio");

module.exports = ({ MINIO_ACCESS_KEY, MINIO_SECRET_KEY }) => {
  return new Minio.Client({
    endPoint: "monitoring.aow.space",
    port: 9001,
    useSSL: false,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
  });
};
