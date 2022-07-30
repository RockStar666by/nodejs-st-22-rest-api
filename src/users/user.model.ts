import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @Column({ type: DataType.NUMBER, unique: false, allowNull: true })
  age: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;
}
