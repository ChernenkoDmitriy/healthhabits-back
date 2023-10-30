import { HttpException, Injectable } from '@nestjs/common';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ShowFileDto } from './dto/show-file.dto';
import * as dotenv from 'dotenv';
dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

@Injectable()
export class FileStorageService {

    async getFile(dto: ShowFileDto) {
        try {
            const bucketParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: dto.fileName };
            return await s3Client.send(new GetObjectCommand(bucketParams));
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message, error.status || 400);
        }
    }

    async uploadArray(file: Express.Multer.File[]) {
        try {
            return await Promise.all(file.map(async (item) => { return await this.uploadFile(item); }),);
        } catch (error) {
            console.error('ImageService.tryUpload => ', error);
            throw new HttpException(error.message, error.status || 400);
        }
    }

    async uploadFile(file: Express.Multer.File) {
        try {
            const imageS3 = await this.sendToS3(file);
            return { status: imageS3.status, name: 'http://localhost:4002/healthhabits/file-storage/' + imageS3.name };
        } catch (error) {
            throw new HttpException(error.message, error.status || 400);
        }
    }

    private async sendToS3(file: Express.Multer.File) {
        const bucketOptions = { Bucket: process.env.AWS_BUCKET_NAME, Key: uuidv4(), Body: file.buffer, };
        const data = await s3Client.send(new PutObjectCommand(bucketOptions));
        return { name: bucketOptions.Key, status: data.$metadata.httpStatusCode };
    }

    async deleteFile(fileName: string) {
        try {
            const bucketParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName };
            const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
            return { status: data.$metadata.httpStatusCode };
        } catch (error) {
            console.error(error);
            throw new HttpException(error.message, error.status || 400);
        }
    }

}
