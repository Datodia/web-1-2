import { Transform } from "class-transformer"
import { IsNumber, IsOptional, Max } from "class-validator"

export class QueryParamsDto {
    @IsOptional()
    @Transform(({value}) => Math.max(Number(value), 1))
    @IsNumber()
    page: number = 1

    @IsOptional()
    @Transform(({value}) => Math.min(Number(value), 30))
    @IsNumber()
    // @Max(30)
    take: number = 30
}