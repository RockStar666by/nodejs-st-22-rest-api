import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserGroup } from '../database/relations/user-group.model';
import { User } from '../users/user.model';
import { Permission } from './group.entity';

@Table
export class Group extends Model<Group> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  permissions: Permission[];

  @BelongsToMany(() => User, () => UserGroup)
  users: string[];
}
