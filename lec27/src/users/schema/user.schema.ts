import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps: true})
export class User {

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
        type: Number,
        required: true
    })
    age: number

    @Prop({
        type: Boolean,
    })
    isAdult: boolean

    @Prop({
        type: [mongoose.Types.ObjectId],
        ref: 'post',
        default: []
    })
    posts: mongoose.Types.ObjectId[]
}

export const userSchema = SchemaFactory.createForClass(User)