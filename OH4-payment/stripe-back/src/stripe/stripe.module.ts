import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { transactionSchema } from './entities/user.entity';
import { userSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {schema: transactionSchema, name: 'transaction'},
      {schema: userSchema, name: 'user'},
    ])
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
