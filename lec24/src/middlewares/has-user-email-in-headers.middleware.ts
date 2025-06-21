import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";


export class CheckUserEmail implements NestMiddleware{
    use(req: Request, res: any, next: NextFunction) {
        if(!req.headers.email){
            throw new BadRequestException('email is not provided')
        }

        next()
    }
}