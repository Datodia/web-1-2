import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { CheckUserEmail } from 'src/middlewares/has-user-email-in-headers.middleware';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService]
})
export class ExpensesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserEmail)
      .forRoutes({path: 'expenses', method: RequestMethod.POST})
  }
}
