import { PutObjectRequest, PutObjectOutput, CreateBucketRequest, CreateBucketOutput } from "aws-sdk/clients/s3";

export interface IAwsS3 {
    CreateBucket(params: CreateBucketRequest);
    AddImageToBucket(params: PutObjectRequest): Promise<PutObjectOutput>;
}
