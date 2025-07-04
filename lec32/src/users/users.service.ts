import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ){}

  async create({age, email, name}: CreateUserDto) {
    const existsUser = await this.userRepo.findBy({email})
    if(existsUser.length) throw new BadRequestException('bad reqs')
    const newUser = await this.userRepo.create({age, email, name, posts: []})
    // const newUser = await this.userRepo.create()
    // newUser.name = name
    // newUser.age = age
    // newUser.email = email
    await this.userRepo.save(newUser)
    return newUser
  }

  async findAll() {
    const users = await this.userRepo.find({relations: ['posts']})
    return users
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({where: {id}, relations: ['posts']})
    if(!user) throw new NotFoundException('uiser not found')
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({where: {email: updateUserDto.email}})
    if(user?.email === updateUserDto.email)throw new BadRequestException('asd')

    await this.userRepo.update(id, updateUserDto)
    return user
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({where: {id}})
    if(!user) throw new NotFoundException('user not found')
    await this.userRepo.delete(id)
    return user
  }
}
