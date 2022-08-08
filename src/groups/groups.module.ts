import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InMemoryGroupsRepository } from './repository/in-memory-groups.repository';
import { SequelizeGroupsRepository } from './repository/sequelize-groups.repository';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Group } from './group.model';
import { GroupsRepository } from './repository/groups.repository';

@Module({
  imports: [SequelizeModule.forFeature([Group])],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    {
      provide: GroupsRepository,
      useClass:
        process.env.NODE_ENV === 'test'
          ? InMemoryGroupsRepository
          : SequelizeGroupsRepository,
    },
  ],
  exports: [SequelizeModule],
})
export class GroupsModule {}
