import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User as UserModel } from './user.model';
import { User } from './user.entity';
import { AppModule } from '../app.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { CreateUserDto } from './dto/create-user-dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserParamsDto } from './dto/user-params-dto';
import { UpdateUserDto } from './dto/update-user-dto';

export class MockAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }
}

const mockUsersArray: Array<User> = [
  {
    id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
    login: 'johndoe111',
    password: '12345678abc',
    age: 20,
    isDeleted: false,
  },
  {
    id: 'cfe997a7-20b8-4fe4-9605-dd27cd9566e2',
    login: 'johndoe222',
    password: '12345678abc',
    age: 21,
    isDeleted: false,
  },
  {
    id: 'bcfda200-c0fc-4341-909c-cc48ef4b6e9b',
    login: 'johndoe333',
    password: '12345678abc',
    age: 22,
    isDeleted: false,
  },
  {
    id: '0d29064e-ad87-458e-87bf-838dbd0e3703',
    login: 'johndoe444',
    password: '12345678abc',
    age: 23,
    isDeleted: false,
  },
  {
    id: '0bf2512b-706d-43e4-882d-e0927387acdf',
    login: 'johndoe555',
    password: '12345678abc',
    age: 24,
    isDeleted: false,
  },
  {
    id: '086592c0-3db1-4895-b760-65fe27497804',
    login: 'johndoe666',
    password: '12345678abc',
    age: 25,
    isDeleted: false,
  },
];

describe('usersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    getAllUsers: jest.fn(() => mockUsersArray),
    getUser: jest.fn((id) => {
      return id === mockUsersArray[0].id ? mockUsersArray[0] : undefined;
    }),

    createUser: jest.fn((dto: CreateUserDto) => {
      return dto.login == mockUsersArray[0].login
        ? undefined
        : {
            id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
            ...dto,
            isDeleted: false,
          };
    }),
    updateUser: jest.fn((id, dto: UpdateUserDto) => {
      return id === mockUsersArray[0].id
        ? {
            id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
            login: 'updateuser@gmail.com',
            password: '987654321fff',
            age: 50,
            isDeleted: true,
          }
        : undefined;
    }),
    softDeleteUser: jest.fn((id) => {
      return id === mockUsersArray[0].id ? mockUsersArray[0] : undefined;
    }),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(MockAuthGuard)
      .compile();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();
    controller = module.get<UsersController>(UsersController);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      expect(await controller.getAllUsers()).toEqual(mockUsersArray);
    });
  });

  describe('getUser', () => {
    const rightId: UserParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
    };
    const wrongId: UserParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444852',
    };
    it('should return user by ID', async () => {
      expect(await controller.getUser(rightId)).toEqual(mockUsersArray[0]);
    });
    it('should throw HttpException if user not found', async () => {
      await expect(async () => {
        await controller.getUser(wrongId);
      }).rejects.toThrow(
        new HttpException('User not found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('createUser', () => {
    const dto: CreateUserDto = {
      login: 'newuser@gmail.com',
      password: '12345678aaa',
      age: 50,
    };
    const existingUser: CreateUserDto = {
      login: 'johndoe111',
      password: '12345678aaa',
      age: 50,
    };
    const response = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
      ...dto,
      isDeleted: false,
    };
    it('should create and return new user', async () => {
      expect(await controller.createUser(dto)).toEqual(response);
    });
    it('should throw HttpException if user already exists', async () => {
      await expect(async () => {
        await controller.createUser(existingUser);
      }).rejects.toThrow(
        new HttpException('This login already exists', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('updateUser', () => {
    const rightId: UserParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
    };
    const wrongId: UserParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444852',
    };
    const dto: UpdateUserDto = {
      login: 'updateuser@gmail.com',
      password: '987654321fff',
      age: 50,
      isDeleted: true,
    };
    it('should update and return user by ID', async () => {
      expect(await controller.updateUser(rightId, dto)).toEqual({
        ...rightId,
        ...dto,
      });
    });
    it('should throw HttpException if user not found', async () => {
      await expect(async () => {
        await controller.updateUser(wrongId, dto);
      }).rejects.toThrow(
        new HttpException('User not found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('softDeleteUser', () => {
    const rightId: UserParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
    };
    const wrongId: UserParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444852',
    };
    it('should softDelete and return deleted user by ID', async () => {
      expect(await controller.softDeleteUser(rightId)).toEqual(
        mockUsersArray[0],
      );
    });
    it('should throw HttpException if user not found', async () => {
      await expect(async () => {
        await controller.softDeleteUser(wrongId);
      }).rejects.toThrow(
        new HttpException('User not found', HttpStatus.BAD_REQUEST),
      );
    });
  });
});
