import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"


export class SignUpDto {
    @ApiProperty({example: 'John doe'})
    @IsNotEmpty()
    @IsString()
    fullName: string

    @ApiProperty({example: 'test@gmail.com'})
    @IsNotEmpty()
    @IsEmail()
    email: string

    
    @ApiProperty({example: 22, type: Number})
    @IsNotEmpty()
    @IsNumber()
    age: number

    @ApiProperty({example: 'password123', minLength: 6, maxLength: 20})
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string
}