import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Product {
    @Prop({
        type: String,
        required: true
    })
    name: string

    @Prop({
        type: String,
        required: true
    })
    desc: string

    @Prop({
        type: Number,
        required: true,
        index: true
    })
    price: number

    @Prop({
        type: String,
        required: true
    })
    imgUrl: string

    @Prop({
        type: Number,
        required: true
    })
    quantity: number
}

export const productSchema = SchemaFactory.createForClass(Product)
