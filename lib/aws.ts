import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuidv4 } from 'uuid'; // Import uuid v4

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;
const SIGNED_URL_EXPIRES_IN = 60 * 10;

export async function uploadImageToS3(fileBuffer: Buffer, contentType: string): Promise<{ success: true; fileKey: string } | { success: false; error: string }> {
  try {
    const uniqueId = uuidv4()
    const extension = contentType.split("/")[1] ?? "bin"
    const fileKey = `${uniqueId}.${extension}`

    const putObjectCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: contentType,
    })
    await s3Client.send(putObjectCommand);
    return { success: true, fileKey: fileKey };
  } catch(error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown S3 upload error";
    return { success: false, error: `S3 Upload failed: ${errorMessage}` };
  }
}

export async function getImageUrl(fileKey: string): Promise<string | null> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
  })

  try {
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: SIGNED_URL_EXPIRES_IN });
    return signedUrl
  } catch(error){
    console.error(`Error generating signed URL for ${fileKey}:`, error);
    return null;
  }
}
