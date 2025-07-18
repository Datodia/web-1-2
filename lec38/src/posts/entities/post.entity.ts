import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Post {

    @Prop({
        type: String,
        required: true
    })
    title: string

    @Prop({
        type: String,
        required: true
    })
    content: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    })
    author: mongoose.Schema.Types.ObjectId
}

export const postSchema = SchemaFactory.createForClass(Post)