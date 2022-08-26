import { Test, TestingModule } from '@nestjs/testing';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { AppModule } from '../app.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Group } from './group.entity';
import { CreateGroupDto } from './dto/create-group-dto';
import { UpdateGroupDto } from './dto/update-group-dto';
import { GroupParamsDto } from './dto/group-params-dto';
import { AddUsersToGroupDto } from './dto/add-users-to-group-dto';

export class MockAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  constructor(private reflector: Reflector) {
    super();
  }
}

const mockGroupsArray: Array<Group> = [
  {
    id: '92300b8e-5aaa-4db0-ab48-3c140f0d2057',
    name: 'Group1',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
  },
  {
    id: 'f5a55589-9f61-4666-9fe1-0b0f15ca21f2',
    name: 'Group2',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
  },
];

describe('GroupsController', () => {
  let controller: GroupsController;
  const mockGroupsService = {
    getAllGroups: jest.fn(() => mockGroupsArray),
    getGroup: jest.fn((id) => {
      return id === mockGroupsArray[0].id ? mockGroupsArray[0] : undefined;
    }),

    createGroup: jest.fn((dto: CreateGroupDto) => {
      return dto.name == mockGroupsArray[0].name
        ? undefined
        : {
            id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
            ...dto,
          };
    }),
    updateGroup: jest.fn((id, dto: UpdateGroupDto) => {
      return id === mockGroupsArray[0].id
        ? {
            id: id,
            ...dto,
          }
        : undefined;
    }),
    deleteGroup: jest.fn((id) => {
      return id === mockGroupsArray[0].id ? mockGroupsArray[0] : undefined;
    }),
    addUsersToGroup: jest.fn((id, users: AddUsersToGroupDto) => {
      return id === mockGroupsArray[0].id
        ? { ...mockGroupsArray[0], ...users }
        : undefined;
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
      controllers: [GroupsController],
      providers: [GroupsService],
    })
      .overrideProvider(GroupsService)
      .useValue(mockGroupsService)
      .compile();
    controller = module.get<GroupsController>(GroupsController);
  });

  describe('getAllGroups', () => {
    it('should return an array of groups', async () => {
      expect(await controller.getAllGroups()).toEqual(mockGroupsArray);
    });
  });

  describe('getGroup', () => {
    const rightId: GroupParamsDto = {
      id: '92300b8e-5aaa-4db0-ab48-3c140f0d2057',
    };
    const wrongId: GroupParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444852',
    };
    it('should return group by ID', async () => {
      expect(await controller.getGroup(rightId)).toEqual(mockGroupsArray[0]);
    });
    it('should throw HttpException if group not found', async () => {
      await expect(async () => {
        await controller.getGroup(wrongId);
      }).rejects.toThrow(
        new HttpException('Group not found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('createGroup', () => {
    const dto: CreateGroupDto = {
      name: 'Group3',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
    };
    const existingGroup: CreateGroupDto = {
      name: 'Group1',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
    };
    const response = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444854',
      ...dto,
    };
    it('should create and return new group', async () => {
      expect(await controller.createGroup(dto)).toEqual(response);
    });
    it('should throw HttpException if group already exists', async () => {
      await expect(async () => {
        await controller.createGroup(existingGroup);
      }).rejects.toThrow(
        new HttpException('This login already exists', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('updateGroup', () => {
    const rightId: GroupParamsDto = {
      id: '92300b8e-5aaa-4db0-ab48-3c140f0d2057',
    };
    const wrongId: GroupParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444852',
    };
    const dto: UpdateGroupDto = {
      name: 'Group1',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
    };
    it('should update and return group by ID', async () => {
      expect(await controller.updateGroup(rightId, dto)).toEqual({
        ...rightId,
        ...dto,
      });
    });
    it('should throw HttpException if group not found', async () => {
      await expect(async () => {
        await controller.updateGroup(wrongId, dto);
      }).rejects.toThrow(
        new HttpException('Group not found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('deleteGroup', () => {
    const rightId: GroupParamsDto = {
      id: '92300b8e-5aaa-4db0-ab48-3c140f0d2057',
    };
    const wrongId: GroupParamsDto = {
      id: '4be63a74-f7ab-47c8-9d41-6b049c444852',
    };

    it('should softDelete and return deleted group by ID', async () => {
      expect(await controller.deleteGroup(rightId)).toEqual(mockGroupsArray[0]);
    });
    it('should throw HttpException if group not found', async () => {
      await expect(async () => {
        await controller.deleteGroup(wrongId);
      }).rejects.toThrow(
        new HttpException('Group not found', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('addUserToGroup', () => {
    const rightId: GroupParamsDto = {
      id: '92300b8e-5aaa-4db0-ab48-3c140f0d2057',
    };
    const addUserDto: AddUsersToGroupDto = {
      userIds: ['92300b8e-5aaa-4db0-ab48-3c140f0d2057'],
    };
    it('should add users to group and return group', async () => {
      expect(await controller.addUsersToGroup(rightId, addUserDto)).toEqual({
        ...mockGroupsArray[0],
        ...addUserDto,
      });
    });
  });
});
