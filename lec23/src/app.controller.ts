import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// localhost:3000/users
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //localhost:3000/users/test
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('users')
  // getAllUsers(){
  //   return this.appService.getAllUsers()
  // }
}
