import { Body, Controller, Get, Headers, Param, ParseIntPipe, Post, Query, Req, Res } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CategoryPipe } from './pipes/category.pipe';
import { CreateExpenseDTO } from './dto/create-expense.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { Request, Response } from 'express';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesService: ExpensesService){}

    @Get()
    getAllExpenses(
        // @Query('category', new CategoryPipe()) category,
        // @Query(new CategoryPipe()) query,
        @Query() { page, take }: QueryParamsDto,
        @Headers('user-agent') userAgent,
        @Headers('role') role,
        @Req() req: Request,
        @Res() res: Response
        // @Query('priceFrom', ParseIntPipe) priceFrom,
    ){
        // console.log(category, priceFrom, "query")
        // console.log(userAgent, "userAgent")
        console.log(role, "role")
        console.log(page, take, "query")
        // start = (page - 1) * take.   
        // end = page * take

        // skip(start).limit(end)
        // slice(start, end)
        res.redirect('https://chess.com')
        return this.expensesService.getAllExpenses()
    }

    @Get(':id')
    getExpenseById(@Param('id', ParseIntPipe) id){
        console.log(typeof id)
        return
    }

    @Post()
    createExpense(@Body() createExpenseDto: CreateExpenseDTO){
        console.log("shemodisss?")
        return createExpenseDto
    }

}
