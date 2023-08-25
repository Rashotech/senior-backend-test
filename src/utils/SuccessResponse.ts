export class SuccessResponse {
  message: string;
  statusCode: number;
  data: any;

  constructor(message = 'successful', data?: any, statusCode = 200) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
