import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class CategoryPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {

        const knownCategories = ['shopping', 'food', 'sport']
        if(value && 'category' in value && !knownCategories.includes(value.category)){
            throw new BadRequestException('Unkown Category')
        }
        if(value && 'priceFrom' in value && isNaN(value.price)){
            throw new BadRequestException('Unkown Category')
        }
        if(value && 'priceFrom' in value && !isNaN(value.price)){
            value.priceFrom = Number(value.priceFrom)
        }

        return value
    }
}
