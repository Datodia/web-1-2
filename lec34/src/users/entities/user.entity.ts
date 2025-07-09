import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({
        type: String
    })
    fullName: string

    @Prop({
        type: String
    })
    email: string

    @Prop({
        type: Number
    })
    age: number
}
export const userSchema = SchemaFactory.createForClass(User)