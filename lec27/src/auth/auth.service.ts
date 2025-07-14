import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('user') private userModel: Model<User>,
        private jwtService: JwtService,
        private emailSenderService: EmailSenderService,
    ) { }

    async signUp({ age, email, fullName, password }: SignUpDto) {
        const existUser = await this.userModel.findOne({ email })
        if (existUser) {
            throw new BadRequestException('user already exist')
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const otpCode = Math.random().toString().slice(2, 8)
        const validationDate = new Date()
        validationDate.setTime(validationDate.getTime() + 3 * 60 * 1000)

        const newUser = await this.userModel.create({
            email,
            age,
            fullName,
            password: hashedPass,
            isAdult: age >= 18,
            OTPCode: otpCode,
            OTPValidationDate: validationDate,
        })

        await this.emailSenderService.sendOTPCode(email, otpCode)

        return 'Check email for continue verification process'
    }

    async verifyEmail({ email, otpCode }: VerifyEmailDTO) {
        const user = await this.userModel.findOne({ email })
        if (!user) throw new NotFoundException('user not found')

        if (user.isActive) throw new BadRequestException('user already verifeid')
        if (new Date(user.OTPValidationDate as string) < new Date()) throw new BadRequestException('OTP Code is outdated')

        if (user.OTPCode !== otpCode) throw new BadRequestException('invalid otp code provided')

        await this.userModel.updateOne({ _id: user._id }, {
            '$set': { OTPCode: null, OTPValidationDate: null, isActive: true }
        })

        const payload = {
            id: user._id,
        }

        const token = this.jwtService.sign(payload, { expiresIn: '1h' })
        return { token, verify: 'ok' }

    }


    async resendOTPCode(email) {
        const user = await this.userModel.findOne({ email })
        if (!user) throw new NotFoundException('user not fdound')

        const otpCode = Math.random().toString().slice(2, 8)
        const validationDate = new Date()
        validationDate.setTime(validationDate.getTime() + 3 * 60 * 1000)

        await this.userModel.updateOne({_id: user._id}, {
            '$set': {OTPCode: otpCode, OTPValidationDate: validationDate}
        })
        await this.emailSenderService.sendOTPCode(email, otpCode)

        return 'check email to finish verification process'
    }


    async signIn({ email, password }: SignInDto) {
        const existUser = await this.userModel.findOne({ email }).select('password isActive')

        if (!existUser) {
            throw new BadRequestException('invalid credentials')
        }

        const isPassEqual = await bcrypt.compare(password, existUser.password)
        if (!isPassEqual) {
            throw new BadRequestException('invalid credentials')
        }

        console.log(existUser, "existUser")
        if (!existUser.isActive) throw new BadRequestException('verify email')

        const payload = {
            id: existUser._id,
        }

        const token = this.jwtService.sign(payload, { expiresIn: '1h' })
        return { token }
    }

    async getCurrentUser(userId) {
        console.log(userId, "userId")
        const user = await this.userModel.findById(userId)
        console.log(user, "user")
        return user
    }

}
