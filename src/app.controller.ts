import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  async getConfirmationEmail(@Body() requestDto: RequestConfirmCodeDto) {
    return await this.mailService.sendUserConfirmation(
      requestDto,
      Math.floor(Math.random() * 1000000).toString(),
    );
  }
  @Post('/verify-code')
  async verifyConfirmationCode(
    @Body() verifyCode: { code: string; email: string },
  ) {
    const { code, email } = verifyCode;
    const result = await this.mailService.verifyUserCode(email, code);
    return result?.emailVerified || false;
  }
}
