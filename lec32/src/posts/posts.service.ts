import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepo: Repository<Post>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ){}
  async create({content, title, userId}: CreatePostDto) {
    const user = await this.userRepo.findOne({where: {id: userId}, relations: ['posts']})
    if(!user) throw new BadRequestException('user not found')
    const newPost = await this.postRepo.create({
      content, 
      title, 
      author: user
    })
    await this.postRepo.save(newPost)
    console.log(user, "")
    user.posts.push(newPost)
    await this.userRepo.save(user)

    return newPost
  }

  findAll() {
    return this.postRepo.find({relations: ['author']})
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
