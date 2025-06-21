import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SafeGuard } from 'src/guards/safe.guard';
import { AccessGuard, Admin, Editor, Viewer } from 'src/guards/role.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  // @UseGuards(Editor)
  @UseGuards(new AccessGuard('admin', 'editor'))
  create(@Req() Req, @Body() createUserDto: CreateUserDto) {
    console.log(Req.key, "reqeustkey")
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(Viewer)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(Viewer)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(Editor)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
