import { should } from 'chai';
import { AwsDynamoDB } from '../functions/dynamodb/AwsDynamoDb';
import { DynamoDB } from 'aws-sdk';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { FormatCurrentDate } from '../functions/DateFunctions';
import { AwsS3 } from '../functions/s3/AwsS3';
should();

const dynamoDB = new AwsDynamoDB();
const s3 = new AwsS3();

async function CreateDBTable(TableName: string, KeyAttribute: string) {

    const params: DynamoDB.CreateTableInput = {
        AttributeDefinitions: [
            {
                AttributeName: KeyAttribute,
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: KeyAttribute,
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName,
    };

    return await dynamoDB.CreateTable(params);
}

context('Setup both DBs - User, Inventory', () => {

    describe('Setting up the User DynamoDB table...', () => {
        let result;
        before(async () => {
            result = await CreateDBTable('Users', 'Username');
        });
        it('Table should be Active', () => {
            result.TableDescription.TableStatus.should.equal('ACTIVE');
        });
    });

    describe('Setting up the Inventory DynamoDB table...', () => {
        let result;
        before(async () => {
            result = await CreateDBTable('Inventory', 'BotdDate');
        });
        it('Table should be Active', () => {
            result.TableDescription.TableStatus.should.equal('ACTIVE');
        });
    });
});

context('Creating an Admin to enable login functionality...', () => {

    describe('Create an Admin User', () => {
        let result;
        before(async () => {
            const params: PutItemInput = {
                TableName: 'Users',
                Item: {
                    Username: {
                        S: 'Admin',
                    },
                    Password: {
                        S: 'AdminPass',
                    },
                },
            };
            result = await dynamoDB.InsertItem(params);
        });
        it('User Should have been created', () => {
            console.log(result);
            result.ConsumedCapacity.CapacityUnits.should.equal(1);
        });
    });
});

context('Creating an S3 Bucket...', () => {
    describe('Create an S3 Bucket', () => {
        let result;
        before(async () => {
            const params = {
                Bucket: 'BeanImages',
                ACL: 'public-read',
            };
            result = await s3.CreateBucket(params);
        });
        it('Bucket should be created', () => {
            result.should.equal(true);
        });
    });
});
