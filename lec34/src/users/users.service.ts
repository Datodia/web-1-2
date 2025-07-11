import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './entities/user.entity';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    private awsS3Service: AwsS3Service
  ){}

  async deleletFileById(fileId: string){
    return this.awsS3Service.deleteFileById(fileId)
  }

  async getFileById(fileId: string){
    return this.awsS3Service.getFileById(fileId)
  }

  async uploadFile(file: Express.Multer.File){
    const fileType = file.mimetype.split('/')[1]
    const fileId = `images/${uuidv4()}.${fileType}`
    await this.awsS3Service.uploadFile(fileId, file)

    // this.userModel.findByIdUpdat(userId, {img: fileId})
    return fileId
  }

  async uploadFiles(files: Express.Multer.File[]){
    const uploadFileIds: string[] = []
    
    for(let file of files){
      const fileType = file.mimetype.split('/')[1]
      const fileId = `images/${uuidv4()}.${fileType}`
      await this.awsS3Service.uploadFile(fileId, file)
      uploadFileIds.push(fileId)
    }

    // this.userModel.findByIdUpdat(userId, {img: fileId})
    return uploadFileIds
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    if(!isValidObjectId(id)){
      throw new BadRequestException('User id is invalid')
    }
    const user = await this.userModel.findById(id)

    if(!user){
      throw new NotFoundException('user not found')
    }

    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
