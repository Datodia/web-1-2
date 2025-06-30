import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/product.schema';
import { fa, faker } from '@faker-js/faker';
import { QueryParamsDto } from './dto/query-params.dto';


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('product') private productModel: Model<Product>
  ){}

  async onModuleInit() {
    const count = await this.productModel.countDocuments()
    // await this.productModel.deleteMany()
    if(count === 0){
      const dataToInsert: any = []
      for(let i = 0; i < 100_000; i++){
        dataToInsert.push({
          name: faker.commerce.product(), 
          price: faker.number.int({min: 10, max: 300}),
          desc: faker.commerce.productDescription(),
          quantity: faker.number.int({min: 1, max: 20}),
          imgUrl: faker.image.url()
        })
      }
      await this.productModel.insertMany(dataToInsert)
    }
    console.log('inseted successfully')
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll({name, priceFrom, priceTo, isStock, page, take}: QueryParamsDto) {
    const category = 'gela'
    const filter: any = {}
    //{price: {$gte: 20, $lte: 50}}
    if(name){
      filter.name = {'$regex': name, '$options': 'i'}
    }
    if(isStock){
      filter.quantity = {'$ne': 10}
    }
    if(priceFrom){
      filter.price = {...filter.price, '$gte': priceFrom}
    }
    if(priceTo){
      filter.price = {...filter.price, '$lte': priceTo}
    }
    const products = await this.productModel
      .find({price: 50}).explain()
      // .skip((page - 1) * take)
      // .limit(take)
    return products
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
