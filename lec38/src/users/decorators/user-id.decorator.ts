import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const UserId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const contenxt = GqlExecutionContext.create(ctx)
        const { req } = contenxt.getContext()

        return req.userId
    }
)