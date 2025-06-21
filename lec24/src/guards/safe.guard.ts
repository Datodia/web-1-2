import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SafeGuard implements CanActivate{
    canActivate(context: ExecutionContext) {
        const req: Request & {key: string} = context.switchToHttp().getRequest()
        const key = req.headers.key

        if(!key || key !== '123'){
            return false
        }

        req.key = key

        
        return true
    }
}