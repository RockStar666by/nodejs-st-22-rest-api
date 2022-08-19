import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InMemoryUsersRepository } from './repository/in-memory-users.repository';
import { SequelizeUsersRepository } from './repository/sequelize-users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { UsersRepository } from './repository/users.repository';
import { Group } from 'src/groups/group.model';
import { UserGroup } from 'src/database/relations/user-group.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Group, UserGroup])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass:
        process.env.NODE_ENV === 'test'
          ? InMemoryUsersRepository
          : SequelizeUsersRepository,
    },
  ],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
