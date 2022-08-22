import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeUsersRepository } from './repository/sequelize-users.repository';
import { User as UserModel } from './user.model';
import { User } from './user.entity';

describe('usersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService(new SequelizeUsersRepository(UserModel));
    usersController = new UsersController(usersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result: User[] = [];
      jest
        .spyOn(usersService, 'getAllUsers')
        .mockImplementation(async () => result);

      expect(await usersController.getAllUsers()).toBe(result);
    });
  });
});
