import { HttpStatus } from '@nestjs/common';

export default class ResponseStructure {
  public StatusCode: HttpStatus;
  public Body: string;

  constructor(statusCode: HttpStatus, body: object) {
    this.StatusCode = statusCode;
    this.Body = JSON.stringify(body);
  }
}
