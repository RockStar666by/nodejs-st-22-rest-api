import { Column, Model, Table, DataType } from 'sequelize-typescript';
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
}
