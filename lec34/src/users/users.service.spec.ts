import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

describe('UsersService', () => {
  let userService: UsersService;
  let userModel: Model<User>

  const mockUserModel = {
    findById: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  }

  const userMock = {
    _id: "12345678901234567890aaaa",
    fullName: "giorgi",
    age: 21,
    email: "giorgi@gmail.com",
    __v: 0
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, 
        {
          provide: getModelToken('user'),
          useValue: mockUserModel
        }
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('user'))
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('FindById', () => {
    it('shuld throw error when wrong id passed', async () => {
      const invalidId = "rame"
      expect(async () => {
        await userService.findOne(invalidId)
      }).rejects.toThrow(BadRequestException)
    })

    it('should throw not found error when user not found', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(null)

      expect(async () => {
        await userService.findOne('12345678901234567890aaaa')
      }).rejects.toThrow(NotFoundException)
    })

    it('should return user when everything is correct', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(userMock)
      const user = await userService.findOne('12345678901234567890aaaa')
      expect(user._id).toBe(userMock._id)
    })
  })

  describe('FindById', () => {
    it('shuld throw error when wrong id passed', async () => {
      const invalidId = "rame"
      expect(async () => {
        await userService.findOne(invalidId)
      }).rejects.toThrow(BadRequestException)
    })

    it('should throw not found error when user not found', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(null)

      expect(async () => {
        await userService.findOne('12345678901234567890aaaa')
      }).rejects.toThrow(NotFoundException)
    })

    it('should return user when everything is correct', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValue(userMock)

      const user = await userService.findOne('12345678901234567890aaaa')
      
      expect(user._id).toBe(userMock._id)
    })
  })
});
