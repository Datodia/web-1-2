import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    getAllUsers(){
        return this.usersService.getAllUsers()
    }

    @Get(':id')
    // @HttpCode(201)
    getUserById(@Param('id') id){
        return this.usersService.getUserById(Number(id))
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        const email = createUserDto?.email
        const name = createUserDto?.name
        return this.usersService.createUser({email, name})
    }

    @Delete(':id')
    deleteUserById(@Param('id') id){
        return this.usersService.deleteUserById(Number(id))
    }

    @Put(':id')
    udpateUser(@Param('id') id, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.updateUserById(Number(id), updateUserDto)
    }
}