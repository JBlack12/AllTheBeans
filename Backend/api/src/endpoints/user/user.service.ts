import { Injectable, Inject } from '@nestjs/common';
import { AwsDynamoDB } from 'src/functions/dynamodb/AwsDynamoDb';
import ResponseObj from '../../models/ResponseStructure';
import { QueryInput } from 'aws-sdk/clients/dynamodb';
import { LoginRequest } from 'src/models/user-requests/loginRequest';

@Injectable()
export class UserService {

  private dynamoClient: AwsDynamoDB;

  constructor(@Inject('DynamoDBClient') DynamoDbClient: AwsDynamoDB) {
    this.dynamoClient = DynamoDbClient;
  }

  async postUserLogin(loginRequest: LoginRequest): Promise<ResponseObj> {

    const params: QueryInput = {
      TableName: 'Users',
      ExpressionAttributeValues: {
        ':v1': {
          S: loginRequest.username,
        },
      },
      KeyConditionExpression: 'Username = :v1',
    };

    try {
      const result = await this.dynamoClient.QueryItem(params);
      if (
        result &&
        result.Items &&
        result.Items[0] &&
        result.Items[0].Password &&
        result.Items[0].Password.S === loginRequest.password
      ) {
        return new ResponseObj(200, {
          AuthToken: 'ThisIsTheRequiredAuthToken',
        });
      }
    } catch (err) {
      // tslint:disable-next-line: no-console -- we would ideally output this to cloudwatch logs if there was an internal error
      console.log(err);
    }

    return new ResponseObj(500, {
      ErrorMessage: 'Login Unsuccessful, Please Try Again',
    });
  }
}
