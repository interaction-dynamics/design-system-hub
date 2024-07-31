import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

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

  const body = await fetch(source).then((res) => res.body)

  if (!body) return ''

  const newKey = `documentation-portal/components-assets/${id}.webp`

  const parallelUploads3 = new Upload({
    client,
    params: {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: newKey,
      Body: body,
      ContentType: 'image/webp',
    },

    // additional optional fields show default values below:

    // (optional) concurrency configuration
    queueSize: 4,

    // (optional) size of each part, in bytes, at least 5MB
    partSize: 1024 * 1024 * 5,

    // (optional) when true, do not automatically call AbortMultipartUpload when
    // a multipart upload fails to complete. You should then manually handle
    // the leftover parts.
    leavePartsOnError: false,
  })

  await parallelUploads3.done()

  const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${newKey}`
  return url
}
