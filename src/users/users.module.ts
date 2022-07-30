import { Inject, Module } from '@nestjs/common';
import { InMemoryUsersRepository } from './repository/in-memory-users.repository';
import { SequelizeUsersRepository } from './repository/sequelize-users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: Inject('UsersRepository'),
      useClass:
        process.env.NODE_ENV === 'test'
          ? InMemoryUsersRepository
          : SequelizeUsersRepository,
    },
  ],
  exports: [SequelizeModule],
})
export class UsersModule {}
