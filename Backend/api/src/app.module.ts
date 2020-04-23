import { Module } from '@nestjs/common';
import { InventoryController } from './endpoints/inventory/inventory.controller';
import { InventoryService } from './endpoints/inventory/inventory.service';
import { UserController } from './endpoints/user/user.controller';
import { UserService } from './endpoints/user/user.service';
import { AwsDynamoDB } from './functions/dynamodb/AwsDynamoDb';
import { AwsS3 } from './functions/s3/AwsS3';

@Module({
  imports: [],
  controllers: [
    InventoryController,
    UserController,
  ],
  providers: [
    InventoryService,
    UserService,
    {
      provide: 'DynamoDBClient',
      useValue: new AwsDynamoDB(),
    },
    {
      provide: 'S3Client',
      useValue: new AwsS3(),
    },
  ],
})
export class AppModule {}
