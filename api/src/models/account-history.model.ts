import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "account_history",
  createdAt: 'created_at',
  updatedAt: false
})
export default class AccountHistory extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.NUMBER(),
    field: "account_number"
  })
  accountNumber?: number;

  @Column({
    type: DataType.STRING(255),
    field: "event"
  })
  event?: string;

  @Column({
    type: DataType.NUMBER(),
    field: "amount"
  })
  amount?: number;
}