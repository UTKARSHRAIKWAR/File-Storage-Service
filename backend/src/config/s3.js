import { GetObjectAclCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// const generateURL = async (key) => {
//   const command = new GetObjectAclCommand({
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: key,
//   });

//   const url = await getSignedUrl(s3, command);
//   return url;
// };

export default s3;
