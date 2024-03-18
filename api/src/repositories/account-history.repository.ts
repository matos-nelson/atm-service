import AccountHistory from "../models/account-history.model";
import { Op, Sequelize } from "sequelize";

interface IAccountHistoryRepository {
  findAll(accountNumber: number): Promise<AccountHistory[] | null>;
  findTotalAmount(accountNumber: number, event: string): Promise<number>;
  save(accountHistory: AccountHistory): Promise<number | undefined>;
}

interface SearchCondition {
  [key: string]: any;
}

class AccountHistoryRepository implements IAccountHistoryRepository {
  async findTotalAmount(accountNumber: number, event: string): Promise<number> {
    try {
      const TODAY_START = new Date().setHours(0, 0, 0, 0);
      const NOW = new Date();

      let condition: SearchCondition = {};
      condition.account_number = accountNumber;
      condition.event = event;
      condition.created_at = {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW,
      };

      const total = await AccountHistory.sum("amount", {
        where: condition,
      });

      return total;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve account histories!");
    }
  }

  async findAll(accountNumber: number): Promise<AccountHistory[] | null> {
    try {
      const TODAY_START = new Date().setHours(0, 0, 0, 0);
      const NOW = new Date();

      let condition: SearchCondition = {};
      condition.account_number = accountNumber;
      condition.created_at = {
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW,
      };

      return await AccountHistory.findAll({ where: condition });
    } catch (error) {
      console.log(error);
      throw new Error("Failed to retrieve account histories!");
    }
  }

  async save(accountHistory: AccountHistory): Promise<number | undefined> {
    try {
      const persitedRecord = await AccountHistory.create({
        accountNumber: accountHistory.accountNumber,
        event: accountHistory.event,
        amount: accountHistory.amount,
      });
      return persitedRecord.id;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create account history!");
    }
  }
}

export default new AccountHistoryRepository();
