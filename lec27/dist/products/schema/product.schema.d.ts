declare enum Role {
    "ADMIN" = "admin",
    "USER" = "user",
    "EDITOR" = "editor"
}
export declare class Product {
    name: string;
    role: Role;
    desc: string;
    isGuarantee: boolean;
    category: string;
    price: number;
    imgUrl: string;
    quantity: number;
}
export declare const productSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product, any> & Product & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}> & import("mongoose").FlatRecord<Product> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
