import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<string>;
    continueWithGoogle(): void;
    googleCallback(req: any, res: Response): Promise<void>;
    verifyEmail({ email, otpCode }: VerifyEmailDTO): Promise<{
        token: string;
        verify: string;
    }>;
    verficationCode(email: string): Promise<string>;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
    }>;
    getCurrentUser(userId: any): Promise<import("mongoose").Document<unknown, {}, import("../users/schema/user.schema").User, {}> & import("../users/schema/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
