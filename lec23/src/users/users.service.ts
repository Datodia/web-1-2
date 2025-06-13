import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'user 1', email: "user@gmail.com" },
        { id: 2, name: 'user 2', email: "user2@gmail.com" },
    ]

    getAllUsers() {
        return this.users
    }

    getUserById(id: number) {
        const user = this.users.find(el => el.id === id)
        return user
    }

    createUser({ email, name }: CreateUserDto) {
        if (!email || !name) {
            throw new HttpException('name and email is requied', HttpStatus.BAD_REQUEST)
        }

        const lastId = this.users[this.users.length - 1]?.id || 0
        const newUser = {
            id: lastId + 1,
            name,
            email
        }
        this.users.push(newUser)

        return 'created successfully'
    }

    deleteUserById(id: number) {
        const index = this.users.findIndex(el => el.id === id)
        if (index === -1) throw new NotFoundException('user not found')

        this.users.splice(index, 1)

        return 'deleted successfully'
    }

    updateUserById(id: number, updateUserDto: UpdateUserDto) {
        const index = this.users.findIndex(el => el.id === id)
        if (index === -1) throw new NotFoundException('user not found')

        const updateReq:UpdateUserDto = {}
        if(updateUserDto.email){
            updateReq.email = updateUserDto.email
        }
        if(updateUserDto.name){
            updateReq.name = updateUserDto.name
        }

        this.users[index] = {
            ...this.users[index],
            ...updateReq
        }

        return 'updated successfully'
    }
}