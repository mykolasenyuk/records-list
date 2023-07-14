const prepareMinioBucket = (minioClient, bucketName) => {
  return new Promise((resolve, reject) => {
    minioClient.listBuckets(function (err, buckets) {
      if (err) {
        console.error("Getting error when get list of buckets:", err);
        reject(err);
      }
      const bucketExists = buckets.some((bucket) => bucket.name === bucketName);
      if (bucketExists) {
        console.log(`Bucket '${bucketName}' found`);
        resolve();
      } else {
        console.log(`Creating new bucket ${bucketName}... `);
        minioClient.makeBucket(bucketName, "us-east-1", function (err) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log('Bucket created successfully in "us-east-1".');
            resolve();
          }
        });
      }
    });
  });
};

module.exports = prepareMinioBucket;
