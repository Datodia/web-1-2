import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"


export class SignInDto {
    @ApiProperty({example: 'test@gmail.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({example: 'password123', minLength: 6, maxLength: 20})
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string
}