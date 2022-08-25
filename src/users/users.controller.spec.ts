import { v4 as uuidv4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User as UserModel } from './user.model';
import { User } from './user.entity';
import { AppModule } from '../app.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

export class MockAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }
}

const mockUsersArray: Array<User> = [
  {
    id: uuidv4(),
    login: 'johndoe111',
    password: '12345678abc',
    age: 20,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'johndoe222',
    password: '12345678abc',
    age: 21,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'johndoe333',
    password: '12345678abc',
    age: 22,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'johndoe444',
    password: '12345678abc',
    age: 23,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'johndoe555',
    password: '12345678abc',
    age: 24,
    isDeleted: false,
  },
  {
    id: uuidv4(),
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
    // getUser: jest.fn(() => mockUsersArray[0]),
    // createUser: jest.fn(() => mockUsersArray),
    // updateUser: jest.fn(() => mockUsersArray),
    // softDeleteUser: jest.fn(() => mockUsersArray),
    // getUserByLogin: jest.fn(() => mockUsersArray),
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

  //   describe('getUser', () => {
  //     it('should return user', async () => {
  //       const result = new UserModel();
  //       //  User = {
  //       //     id: 'f7b3724e-af3a-4206-9b25-b6892a391733',
  //       //     login: 'johndoe554',
  //       //     password: '12345678abc',
  //       //     age: 24,
  //       //     isDeleted: false,
  //       //   };
  //       const params: UserParamsDto = {
  //         id: 'f7b3724e-af3a-4206-9b25-b6892a391733',
  //       };
  //       console.log(await usersController.getUser(params));
  //       jest
  //         .spyOn(usersService, 'getUser')
  //         .mockImplementation(async () => result);

  //       expect(await usersController.getUser(params)).toBe(result);
  //     });
  //   });
});
