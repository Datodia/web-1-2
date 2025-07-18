import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreatePostInput {

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    title: string

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    content: string
}
