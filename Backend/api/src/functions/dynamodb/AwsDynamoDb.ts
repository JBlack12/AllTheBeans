import { DynamoDB } from 'aws-sdk';
import { IAwsDynamoDb } from './IAwsDynamoDb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsDynamoDB implements IAwsDynamoDb {

    private DynamoClient: DynamoDB = new DynamoDB({
        endpoint: `http://localstack:4569`,
        region: 'eu-west-1',
    });

    public async CreateTable(params: DynamoDB.CreateTableInput): Promise<DynamoDB.CreateTableOutput> {
        return await this.DynamoClient.createTable(params).promise();
    }

    public async InsertItem(params: DynamoDB.PutItemInput): Promise<DynamoDB.PutItemOutput> {
        return await this.DynamoClient.putItem(params).promise();
    }

    public async QueryItem(params: DynamoDB.QueryInput): Promise<DynamoDB.QueryOutput> {
        return await this.DynamoClient.query(params).promise();
    }

    public async UpdateItem(params: DynamoDB.UpdateItemInput): Promise<DynamoDB.UpdateItemOutput> {
        return await this.DynamoClient.updateItem(params).promise();
    }
}
