import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { Group } from 'src/groups/group.model';

@Table({ freezeTableName: true, createdAt: false, updatedAt: false })
export class UserGroup extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.UUID,
  })
  groupId: string;
}
