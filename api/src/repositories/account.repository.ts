import Account from "../models/account.model";

interface IAccountRepository {
  findByAccountNumber(id: number): Promise<Account | null>;
  updateAmount(accountNumber: number, amount: number): Promise<void>;
}

class AccountRepository implements IAccountRepository {
  async findByAccountNumber(accountNumber: number): Promise<Account | null> {
    try {
      return await Account.findByPk(accountNumber);
    } catch (error) {
      throw new Error("Failed to retrieve account record!");
    }
  }

  async updateAmount(accountNumber: number, amount: number): Promise<void> {
    try {
      await Account.update(
        { amount },
        { where: { account_number: accountNumber } }
      );
    } catch (error) {
      throw new Error("Failed to update Account amount!");
    }
  }
}

export default new AccountRepository();
