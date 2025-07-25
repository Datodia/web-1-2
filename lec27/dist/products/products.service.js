"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    create(createProductDto) {
        return 'This action adds a new product';
    }
    async findAll({ name, priceFrom, priceTo, isStock, page, take }) {
        const category = 'gela';
        const filter = {};
        if (name) {
            filter.name = { '$regex': name, '$options': 'i' };
        }
        if (isStock) {
            filter.quantity = { '$ne': 10 };
        }
        if (priceFrom) {
            filter.price = { ...filter.price, '$gte': priceFrom };
        }
        if (priceTo) {
            filter.price = { ...filter.price, '$lte': priceTo };
        }
        const products = await this.productModel
            .aggregate([
            { $match: { price: { '$gte': 30 } } },
            { $group: { _id: '$category', totalPrice: { $max: '$price' }, total: { $count: 'name' }, id: { '$push': '$$ROOT' } } },
            { $limit: 50 },
        ]);
        return products;
    }
    findOne(id) {
        return `This action returns a #${id} product`;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map