import { Injectable, NotFoundException } from '@nestjs/common';
import { IExpense } from './interfaces/expenses.iterface';

@Injectable()
export class ExpensesService {

    private expenses: IExpense[] = [
        {id: 1, category: "shopping", amount: 300}
    ]

    getAllExpenses(): IExpense[]{
        return this.expenses
    }

    getExpenseById(id: number): IExpense{
        const expense = this.expenses.find(el => el.id === id)
        if(!expense) throw new NotFoundException('Expense not found')

        return expense
    }

}
