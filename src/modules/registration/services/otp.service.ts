import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/app-prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { TwilioService } from 'nestjs-twilio';
import { IAppConfig, ITwilio } from '@app/app-config/app-config.interface';

@Injectable()
export class OTPService {
  private twilioClient;
  private senderPhoneNumber: string;
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService<IAppConfig>,
    private readonly twilioService: TwilioService,
  ) {
    const useTwilio = configService.get<ITwilio>('useTwilio');
    const accountSid = useTwilio.accountSid;
    const authToken = useTwilio.authToken;
    this.senderPhoneNumber = useTwilio.phoneNumber;

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async generateOTP(user) {
    // new tomorrow date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // create otp
    const otp = Math.floor(100000 + Math.random() * 900000);
    // send sms
    const result = await this.sendMessage(
      user.phoneNumber.toString(),
      otp.toString(),
    );
    if (!result) {
      throw new BadRequestException('Error sending sms');
    }

    return await this.prismaService.oTP.create({
      data: {
        otp: otp.toString(),
        expiredAt: tomorrow,
        phone: user.phoneNumber,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
  async verifyOTP(otp: string, phone: string) {
    const otpRecord = await this.prismaService.oTP.findFirst({
      where: { otp, phone },
    });
    if (!otpRecord) {
      return false;
    }
    if (otpRecord.expiredAt < new Date()) {
      return false;
    }
    await this.prismaService.oTP.delete({
      where: { id: otpRecord.id },
    });

    return true;
  }

  async sendMessage(receiverPhoneNumber: string, message: string) {
    // const r = await this.twilioService.client.messages.create({
    //   body: message,
    //   from: senderPhoneNumber,
    //   to: receiverPhoneNumber,
    //  });

    return await this.twilioClient.messages.create({
      body: message,
      from: this.senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  }
}
