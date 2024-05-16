import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  testFunc() {
    return this.mailService.sendUserConfirmation(
      {
        email: 'toptal126@gmail.com',
        name: 'Toptal126',
      },
      '1234',
    );
  }
}
