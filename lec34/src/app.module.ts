import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    UsersModule,
    AwsS3Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
