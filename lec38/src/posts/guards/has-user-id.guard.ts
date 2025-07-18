import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { isValidObjectId } from "mongoose";
import { Observable } from "rxjs";

@Injectable()
export class HasUserId implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const {req} = ctx.getContext()
        const userId = req.headers['user-id']
        if(!userId || !isValidObjectId(userId)) throw new UnauthorizedException()

        req.userId = userId

        return true
    }
}
