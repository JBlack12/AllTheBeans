import { S3 } from 'aws-sdk';
import { IAwsS3 } from './IAwsS3';
import { CreateBucketRequest, PutObjectRequest} from 'aws-sdk/clients/s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsS3 implements IAwsS3 {

    private AwsS3Client: S3 = new S3({
        endpoint: `http://localstack:4572`,
        region: 'eu-west-1',
    });

    public async CreateBucket(params: CreateBucketRequest): Promise<boolean> {
        const result = await this.AwsS3Client.createBucket(params).promise();

        if (result.$response.data) {
            return true;
        } else {
            return false;
        }
    }

    public async AddImageToBucket(params: PutObjectRequest): Promise<S3.PutObjectOutput> {
        return await this.AwsS3Client.putObject(params).promise();
    }
}
