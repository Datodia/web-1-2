import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from './entities/post.entity';
import { userSchema } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'post', schema: postSchema},
      {name: 'user', schema: userSchema},
    ])
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
