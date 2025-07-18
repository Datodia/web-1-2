import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


@InputType()
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    fullName: string

    @IsNotEmpty()
    @IsEmail()
    @Field(() => String)
    email: string
}