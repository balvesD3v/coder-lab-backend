import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class ImagesService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_S3_REGION,
    apiVersion: '2012-08-10',
    credentials: {
      accessKeyId: process.env.AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACESS_KEY,
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(path: string, file: Express.Multer.File) {
    const url = `${path}/${randomUUID()}.${file.mimetype.split('/')[1]}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: url,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      }),
    );

    return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${url}`;
  }
}
