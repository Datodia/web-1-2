import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
    @InjectModel('user') private userModel: Model<User>,
  ) { }

  async create({ content, title }: CreatePostInput, userId) {
    const existUser = await this.userModel.findById(userId)
    if (!existUser) throw new NotFoundException('user not found')

    const post = await this.postModel.create({ title, content, author: userId })
    await this.userModel.findByIdAndUpdate(userId,
      {
        '$push': { posts: post._id.toString() }
      }
    )

    return 'added successfully';
  }

  findAll() {
    return this.postModel.find().populate({ path: 'author', select: 'fullName email' })
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
