import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateExpenseDTO {
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsNotEmpty()
    @IsString()
    category: string
}