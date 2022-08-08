import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import * as dbConfig from './database/config/config.json';
import { User } from './users/user.model';
import { Group } from './groups/group.model';
import { GroupsModule } from './groups/groups.module';
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

@Module({
  imports: [
    SequelizeModule.forRoot({ ...config, models: [User, Group] }),
    UsersModule,
    GroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
