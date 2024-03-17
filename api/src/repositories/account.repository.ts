import Account from "../models/account.model";

interface IAccountRepository {
  findByAccountNumber(id: number): Promise<Account | null>;
  update(account: Account): Promise<number>;
}

class AccountRepository implements IAccountRepository {

  async findByAccountNumber(accountNumber: number): Promise<Account | null> {
    try {
        return await Account.findByPk(accountNumber);
      } catch (error) {
        throw new Error("Failed to retrieve account record!");
      }
  }

  async update(account: Account): Promise<number> {
    const { id, amount } = account;

    try {
        const affectedRows = await Account.update(
          { amount },
          { where: { id: id } }
        );

        return affectedRows[0];
      } catch (error) {
        throw new Error("Failed to update Account!");
      }
   }
}

export default new AccountRepository();