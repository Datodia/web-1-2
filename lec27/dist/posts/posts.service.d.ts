import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import mongoose, { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/user.schema';
import { QueryParams } from './dto/query-params.dto';
export declare class PostsService {
    private postModel;
    private userModel;
    constructor(postModel: Model<Post>, userModel: Model<User>);
    create({ desc, title }: CreatePostDto, userId: string): Promise<{
        success: string;
        data: mongoose.Document<unknown, {}, Post, {}> & Post & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll({ page, take }: QueryParams): Promise<{
        total: number;
        take: number;
        page: number;
        posts: (mongoose.Document<unknown, {}, Post, {}> & Post & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
