import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class User{

    @Prop({
        type: String,
        required: true
    })
    fullName: string

     @Prop({
        type: String,
        required: true,
        lowercase: true,
        unique: true
    })
    email: string

    @Prop({
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'post'
    })
    posts: mongoose.Schema.Types.ObjectId[]

}

export const userSchema = SchemaFactory.createForClass(User)