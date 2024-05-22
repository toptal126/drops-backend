import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RequestConfirmCodeDto } from './dto/RequestConfirmCode.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async sendUserConfirmation(user: RequestConfirmCodeDto, token: string) {
    console.log(this.userModel.db.name);
    await this.userModel.findOneAndUpdate(
      { email: user.email },
      {
        email: user.email,
        wallet: user.wallet,
        confirmationCode: token,
      },
      { upsert: true },
    );
    const url = `https://nerofi.app/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nerofi App! Confirm your Email',

      template: './confirmation',

      context: {
        name: user.name,
        url,
      },
    });
  }
}
