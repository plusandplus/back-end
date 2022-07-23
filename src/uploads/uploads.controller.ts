import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as AWS from 'aws-sdk';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    try {
      const key = `${Date.now() + file.originalname}`;
      const upload = await new AWS.S3()
        .putObject({
          Key: key,
          Body: file.buffer,
          Bucket: process.env.AWS_BUCKET_NAME,
        })
        .promise();
      console.log(upload);
      const imgurl = process.env.AWS_CLOUDFRONT + key;
      return Object.assign({
        statusCode: 201,
        message: `이미지 등록 성공`,
        data: { url: imgurl },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
