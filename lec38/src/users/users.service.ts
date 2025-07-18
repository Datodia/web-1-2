import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schema/users.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService{
    constructor(
        @InjectModel('user') private userModel: Model<User>
    ){}

    getAll(){
        return this.userModel.find().populate({path: 'posts', select: 'title content'})
    }

    async createUser({email, fullName}:CreateUserDto){
        const existUser = await this.userModel.findOne({email})
        if(existUser) throw new BadRequestException('User already exists')

        const user = await this.userModel.create({email, fullName})
        return user
    }

}