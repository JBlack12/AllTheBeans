import { Injectable, Inject } from '@nestjs/common';
import { IAwsDynamoDb } from 'src/functions/dynamodb/IAwsDynamoDb';
import ResponseObj from '../../models/ResponseStructure';
import { QueryInput, PutItemInput } from 'aws-sdk/clients/dynamodb';
import { AddBeanRequest } from '../../models/inventory-requests/addBeanRequest';
import { GetInventoryBody } from 'src/models/inventory-responses/getInventoryBody';
import { FormatCurrentDate } from '../../functions/DateFunctions';
import { IAwsS3 } from '../../functions/s3/IAwsS3';

@Injectable()
export class InventoryService {
  private dynamoClient: IAwsDynamoDb;
  private s3Client: IAwsS3;

  constructor(@Inject('DynamoDBClient') DynamoDbClient: IAwsDynamoDb, @Inject('S3Client') s3Client: IAwsS3) {
    this.dynamoClient = DynamoDbClient;
    this.s3Client = s3Client;
  }

  async postBeanOfTheDay(
    createBeanRequest: AddBeanRequest,
  ): Promise<ResponseObj> {
    if (createBeanRequest.AuthToken === 'ThisIsTheRequiredAuthToken') {
      const params: PutItemInput = {
        TableName: 'Inventory',
        Item: {
          BotdDate: {
            S: createBeanRequest.Bean.BotdDate,
          },
          Name: {
            S: createBeanRequest.Bean.Name,
          },
          Cost: {
            S: createBeanRequest.Bean.Cost,
          },
          Colour: {
            S: createBeanRequest.Bean.Colour,
          },
          Aroma: {
            S: createBeanRequest.Bean.Aroma,
          },
          Image: {
            S: createBeanRequest.Bean.Image,
          },
        },
      };
      try {
        const result = await this.dynamoClient.InsertItem(params);
        if (result.ConsumedCapacity.CapacityUnits === 1) {
          return new ResponseObj(200, {
            SuccessMessage: 'Successfully created ',
          });
        }
      } catch (err) {
        // tslint:disable-next-line: no-console we would ideally output this to cloudwatch logs if there was an internal error
        console.log(err);
      }
    }
    return new ResponseObj(500, {
      ErrorMessage: 'Bean of the day could not be posted',
    });
  }

  async UploadImage(file: any): Promise<ResponseObj> {

    const params = {
      Body: file.buffer,
      Bucket: 'BeanImages',
      Key: file.originalname,
    };

    const result = await this.s3Client.AddImageToBucket(params);

    if (result && result.ETag) {
      return new ResponseObj(200, {imgName: `http://localhost:4572/beanimages/${file.originalname}`});
    }
    return new ResponseObj(500, {ErrMessage: 'File could not be uploaded'});
  }

  async getBeanOfTheDay(selectedDate?, authKey?): Promise<ResponseObj> {

    let date;
    if (selectedDate && authKey && authKey === 'ThisIsTheRequiredKey') {
      date = selectedDate;
    } else {
      date = FormatCurrentDate();
    }

    const params: QueryInput = {
      TableName: 'Inventory',
      ExpressionAttributeValues: {
        ':v1': {
          S: date,
        },
      },
      KeyConditionExpression: 'BotdDate = :v1',
    };

    const result = await this.dynamoClient.QueryItem(params);

    if (result && result.Items && result.Items[0]) {
      const item = new GetInventoryBody(result.Items[0]);
      return new ResponseObj(200, item);
    }
    return new ResponseObj(500, {
      ErrorMessage: 'Bean of the day could not be found',
    });
  }

}
