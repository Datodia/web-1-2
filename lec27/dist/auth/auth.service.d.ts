import { SignUpDto } from './dto/sign-up.dto';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { VerifyEmailDTO } from './dto/verify-email.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    private emailSenderService;
    constructor(userModel: Model<User>, jwtService: JwtService, emailSenderService: EmailSenderService);
    signUp({ age, email, fullName, password }: SignUpDto): Promise<string>;
    verifyEmail({ email, otpCode }: VerifyEmailDTO): Promise<{
        token: string;
        verify: string;
    }>;
    resendOTPCode(email: any): Promise<string>;
    signIn({ email, password }: SignInDto): Promise<{
        token: string;
    }>;
    continueWithGoogle({ fullName, email, avatar }: {
        fullName: any;
        email: any;
        avatar: any;
    }): Promise<{
        redirectUrl: string;
        token: string;
    }>;
    getCurrentUser(userId: any): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
