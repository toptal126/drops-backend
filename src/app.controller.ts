import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';
import { RequestConfirmCodeDto } from './mail/dto/RequestConfirmCode.dto';

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

  @Post('/get-confirmation-email')
  getConfirmationEmail(@Body() requestDto: RequestConfirmCodeDto) {
    return this.mailService.sendUserConfirmation(
      requestDto,
      Math.floor(Math.random() * 1000000).toString(),
    );
  }
}
