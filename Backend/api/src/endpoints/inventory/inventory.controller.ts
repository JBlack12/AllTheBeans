import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { AddBeanRequest } from 'src/models/inventory-requests/addBeanRequest';
import ResponseObj from '../../models/ResponseStructure';
import {FileInterceptor} from '@nestjs/platform-express';

@Controller('/inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async postAddBean(@Body() request: AddBeanRequest): Promise<ResponseObj> {
    return await this.inventoryService.postBeanOfTheDay(request);
  }

  @Post('/uploadimage')
  @UseInterceptors(FileInterceptor('file'))
  async postStoreImage(@UploadedFile() file: any) {
    return await this.inventoryService.UploadImage(file);
  }

  @Get()
  async getBeanOfTheDay(@Query('date') selectedDate?, @Query('key') authKey?): Promise<ResponseObj> {
    return await this.inventoryService.getBeanOfTheDay(selectedDate, authKey);
  }
}
