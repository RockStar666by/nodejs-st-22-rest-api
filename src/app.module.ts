import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import * as dbConfig from './config/config.json';
import { User } from './users/user.model';
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({ ...config, models: [User] }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
