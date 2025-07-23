import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailSenderService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendTextToSomeone(to: any, subject: any, content: any): Promise<void>;
    sendHtmlToSomeone(to: any, subject: any, content: any, token?: string): Promise<void>;
    sendOTPCode(to: any, otpCode: any): Promise<void>;
}
