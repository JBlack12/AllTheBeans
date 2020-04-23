import { should } from 'chai';
import { PutItemInput } from 'aws-sdk/clients/dynamodb';
import { FormatCurrentDate } from '../functions/DateFunctions';
import { AwsDynamoDB } from '../functions/dynamodb/AwsDynamoDb';

should();

const dynamoDB = new AwsDynamoDB();

context('Add an item for todays BeanOfTheDay', () => {
    describe('Adding 1 item to inventory table', () => {
        let result;
        const currentDate = FormatCurrentDate();
        before(async () => {
            const params: PutItemInput = {
                TableName: 'Inventory',
                Item: {
                  BotdDate: {
                    S: currentDate,
                  },
                  Name: {
                    S: 'Default Bean',
                  },
                  Cost: {
                    S: '5.00',
                  },
                  Colour: {
                    S: 'Brown',
                  },
                  Aroma: {
                    S: 'Aroma',
                  },
                  Image: {
                    S: 'https://s1.thcdn.com/productimg/1600/1600/11260248-2044469031346908.jpg',
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
