import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { IsAuthGuard } from './guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { VerifyEmailDTO } from './dto/verify-email.dto';
import { GoogleAuth } from './guards/google.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto){
    return this.authService.signUp(signUpDto)
  }


  @Get('google')
  @UseGuards(GoogleAuth)
  continueWithGoogle(){}

  @Get('google/callback')
  @UseGuards(GoogleAuth)
  async googleCallback(@Req() req, @Res() res: Response){
    const {redirectUrl, token} = await this.authService.continueWithGoogle(req.user)
    res.cookie('token', token, {maxAge: 60 * 60 * 1000})
    res.redirect(redirectUrl)
  }

  @Post('verify-email')
  verifyEmail(@Body() {email, otpCode}: VerifyEmailDTO){
    return this.authService.verifyEmail({otpCode, email})
  }

  @Post('resend-verification-code')
  verficationCode(@Body('email') email: string){
    return this.authService.resendOTPCode(email)
  }

  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto){
    return this.authService.signIn(signInDto)
  }

  @Get('current-user')
  @UseGuards(IsAuthGuard)
  getCurrentUser(@UserId() userId){
    return this.authService.getCurrentUser(userId)
  }
}
