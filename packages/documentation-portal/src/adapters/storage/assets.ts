import {
  S3Client,
  PutObjectCommand,
  UploadPartCommand,
} from '@aws-sdk/client-s3'
import crypto from 'node:crypto'

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_S3_API_KEY ?? '',
    secretAccessKey: process.env.AWS_S3_API_SECRET ?? '',
  },
  region: process.env.AWS_S3_REGION,
})

export const copyAsset = async (source: string): Promise<string> => {
  const id = crypto.randomBytes(16).toString('hex')

  const body = await fetch(source).then((res) => res.text())

  if (!body) return ''

  const newKey = `documentation-portal/components-assets/${id}.webp`

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: newKey,
    Body: body,
  })

  const response = await client.send(command)

  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${newKey}`
  return url
}
