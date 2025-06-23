import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { User } from 'src/users/schema/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private postModel: Model<Post>,
    @InjectModel('user') private userModel: Model<User>,
  ){}


  async create({desc, title}: CreatePostDto, userId: string) {
    const existUser = await this.userModel.findById(userId)
    if(!existUser) throw new BadRequestException('User not found')

    const newPost = await this.postModel.create({title, desc, author: existUser._id})
    await this.userModel.findByIdAndUpdate(existUser._id, {$push: {posts: newPost._id}})
    // existUser.posts.push(newPost._id)
    // await existUser.save()

    return {success: 'ok', data: newPost}
  }

  findAll() {
    return this.postModel.find().populate({path: 'author', select: 'email fullName'})
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
