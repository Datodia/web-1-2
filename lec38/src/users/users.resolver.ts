import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserPayload } from "./payload/users.payload";
import { CreateUserDto } from "./dto/create-user.dto";

@Resolver()
export class UserResolver{
    constructor(
        private usersService: UsersService
    ){}

    @Query(() => [UserPayload])
    getAllUsers(){
        return this.usersService.getAll()
    }

    @Mutation(() => UserPayload, {nullable: true})
    createUser(@Args('createUserDto') createUserDto: CreateUserDto){
        return this.usersService.createUser(createUserDto)
    }
}