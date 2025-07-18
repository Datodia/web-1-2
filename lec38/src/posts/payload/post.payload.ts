import { Field, ObjectType } from "@nestjs/graphql";
import { UserPayload } from "src/users/payload/users.payload";

@ObjectType()
export class PostPayload {

    @Field(() => String)
    title: string


    @Field(() => String)
    content: string



    @Field(() => UserPayload)
    author: string

}

