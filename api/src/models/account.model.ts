import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "accounts",
  timestamps: false
})
export default class Account extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    field: "account_number"
  })
  accountNumber?: number;

  @Column({
    type: DataType.STRING(255),
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.NUMBER(),
    field: "amount"
  })
  amount?: number;

  @Column({
    type: DataType.STRING(255),
    field: "type"
  })
  type?: string;

  @Column({
    type: DataType.NUMBER(),
    field: "credit_limit"
  })
  creditLimit?: number;
}