import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./schema/users.schema";
import { UserResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'user', schema: userSchema}])
    ],
    providers: [UserResolver, UsersService]
})
export class UsersModule{}