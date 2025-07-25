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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const isAuth_guard_1 = require("../auth/guards/isAuth.guard");
const user_decorator_1 = require("../users/decorators/user.decorator");
const query_params_dto_1 = require("./dto/query-params.dto");
const swagger_1 = require("@nestjs/swagger");
let PostsController = class PostsController {
    postsService;
    constructor(postsService) {
        this.postsService = postsService;
    }
    create(userId, createPostDto) {
        return this.postsService.create(createPostDto, userId);
    }
    findAll(queryParamsDto) {
        return this.postsService.findAll(queryParamsDto);
    }
    findOne(id) {
        return this.postsService.findOne(+id);
    }
    update(id, updatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }
    remove(id) {
        return this.postsService.remove(+id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, user_decorator_1.UserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1, default: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'take', required: false, example: 30, default: 30 }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_params_dto_1.QueryParams]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'The moongodb ID of the user', example: '12345', }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "remove", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuthGuard),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map