import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { QueryParams } from './dto/query-params.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(userId: string, createPostDto: CreatePostDto): Promise<{
        success: string;
        data: import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll(queryParamsDto: QueryParams): Promise<{
        total: number;
        take: number;
        page: number;
        posts: (import("mongoose").Document<unknown, {}, import("./schema/post.schema").Post, {}> & import("./schema/post.schema").Post & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
    }>;
    findOne(id: string): string;
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
