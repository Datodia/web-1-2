import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports: [
    AwsS3Module,
    MongooseModule.forFeature([
      {name: 'user', schema: userSchema}
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
