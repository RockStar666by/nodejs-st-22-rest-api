import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import * as dbConfig from './database/config/config.json';
import { User } from './users/user.model';
import { Group } from './groups/group.model';
import { GroupsModule } from './groups/groups.module';
import { UserGroup } from './database/relations/user-group.model';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...config,
      models: [User, Group, UserGroup],
      autoLoadModels: true,
    }),
    UsersModule,
    GroupsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
