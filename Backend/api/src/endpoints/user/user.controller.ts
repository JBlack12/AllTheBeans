import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import ResponseObj from '../../models/ResponseStructure';
import { LoginRequest } from 'src/models/user-requests/loginRequest';

@Controller('/user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  async postLogin(@Body() request: LoginRequest): Promise<ResponseObj> {
    return await this.appService.postUserLogin(request);
  }
}
