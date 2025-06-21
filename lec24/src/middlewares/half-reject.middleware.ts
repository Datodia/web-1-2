import { BadRequestException, NestMiddleware } from "@nestjs/common";

export class HalfRegejet implements NestMiddleware{
    use(req: any, res: any, next: (error?: any) => void) {
        const random = Math.random()
        if(random > 0.5){
            throw new BadRequestException('rejected')
        }

        next()
    }
}