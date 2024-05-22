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

  async sendUserConfirmation(user: RequestConfirmCodeDto, code: string) {
    console.log(this.userModel.db.name);
    await this.userModel.findOneAndUpdate(
      { email: user.email },
      {
        email: user.email,
        wallet: user.wallet,
        confirmationCode: code,
        guess: user.guess,
      },
      { upsert: true },
    );

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nerofi App! Confirm your Email',

      template: './confirmation',

      context: {
        name: user.name,
        code,
      },
    });
  }

  async verifyUserCode(email: string, code: string) {
    const result = await this.userModel
      .findOneAndUpdate(
        {
          email,
          confirmationCode: code,
        },
        { emailVerified: true },
        { returnDocument: 'after', new: true },
      )
      .exec();
    return result;
  }
}
