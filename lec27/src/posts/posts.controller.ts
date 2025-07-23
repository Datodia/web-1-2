import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HasUserId } from 'src/common/guards/has-user-id.guard';
import { IsAuthGuard } from 'src/auth/guards/isAuth.guard';
import { UserId } from 'src/users/decorators/user.decorator';
import { QueryParams } from './dto/query-params.dto';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
@UseGuards(IsAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@UserId() userId: string, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto, userId);
  }

  @ApiBearerAuth()
  @ApiQuery({name: 'page', required: false, example: 1, default: 1})
  @ApiQuery({name: 'take', required: false, example: 30, default: 30})
  @Get()
  findAll(@Query() queryParamsDto: QueryParams) {
    return this.postsService.findAll(queryParamsDto);
  }

@ApiParam({name: 'id', type: String, description: 'The moongodb ID of the user',example: '12345',})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
