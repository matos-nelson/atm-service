import accountRepository from "../repositories/account.repository";
import { AccountDetails } from "../dto/account-details.dto";
import { Withdrawal } from "../dto/withdrawal.dto";
import accountHistoryRepository from "../repositories/account-history.repository";
import { WithdrawalResponse } from "../dto/withdrawl-reponse.dto";
import AccountHistory from "../models/account-history.model";
import { AccountEvent } from "../enums/account-event.enum";
import { AccountType } from "../enums/account-type.enum";
import { Deposit } from "../dto/deposit.dto";
import { DepositResponse } from "../dto/deposit-response.dto";

class AccountService {
  readonly WITHDRAWAL_DAILY_LIMIT = 400;

  async getAccountDetails(
    accountNumber: number
  ): Promise<AccountDetails | null> {
    const account = await accountRepository.findByAccountNumber(accountNumber);
    if (!account) {
      return null;
    }

    return new AccountDetails(
      account.name!,
      account.amount!,
      account.type!,
      account.creditLimit
    );
  }

  async withdrawFunds(
    withdrawal: Withdrawal,
    type: string
  ): Promise<WithdrawalResponse> {
    const account = await accountRepository.findByAccountNumber(
      withdrawal.accountNumber
    );

    if (!account) {
      throw new Error("Could Not Find Account");
    }

    if (account.type !== type) {
      throw new Error("Invalid Account Type Given");
    }

    const totalWithdrew = await accountHistoryRepository.findTotalAmount(
      withdrawal.accountNumber,
      AccountEvent.Withdraw
    );

    if (totalWithdrew >= this.WITHDRAWAL_DAILY_LIMIT) {
      return new WithdrawalResponse("Daily Limit Reached.", null);
    }

    if (+totalWithdrew + +withdrawal.amount > this.WITHDRAWAL_DAILY_LIMIT) {
      const totalAvailable = this.WITHDRAWAL_DAILY_LIMIT - totalWithdrew;
      return new WithdrawalResponse(
        "Could not withdraw " +
          withdrawal.amount +
          ". Withdraw limit remaining for day is " +
          totalAvailable +
          ".",
        null
      );
    }

    if (withdrawal.amount > account.amount!) {
      return new WithdrawalResponse("Insufficient Funds", null);
    }

    const balance = account.amount! - withdrawal.amount;
    await accountRepository.updateAmount(withdrawal.accountNumber, balance);

    let ah = new AccountHistory();
    ah.accountNumber = account.accountNumber;
    ah.amount = withdrawal.amount;
    ah.event = AccountEvent.Withdraw;
    await accountHistoryRepository.save(ah);
    return new WithdrawalResponse("Withdraw processed successfully.", balance);
  }

  async withdrawCredit(withdrawal: Withdrawal): Promise<WithdrawalResponse> {
    const account = await accountRepository.findByAccountNumber(
      withdrawal.accountNumber
    );

    if (!account) {
      throw new Error("Could Not Find Account");
    }

    if (account.type !== AccountType.Credit) {
      throw new Error("Invalid Account Type");
    }

    const totalWithdrew = await accountHistoryRepository.findTotalAmount(
      withdrawal.accountNumber,
      AccountEvent.Withdraw
    );

    if (totalWithdrew >= this.WITHDRAWAL_DAILY_LIMIT) {
      return new WithdrawalResponse("Daily Limit Reached", null);
    }

    let totalCredit = account.amount! * -1 + withdrawal.amount;
    if (totalCredit > account.creditLimit!) {
      return new WithdrawalResponse("Overdrawing Credit Limit", null);
    }

    totalCredit *= -1;
    await accountRepository.updateAmount(withdrawal.accountNumber, totalCredit);

    let ah = new AccountHistory();
    ah.accountNumber = account.accountNumber;
    ah.amount = withdrawal.amount;
    ah.event = AccountEvent.Withdraw;
    await accountHistoryRepository.save(ah);
    return new WithdrawalResponse(
      "Withdraw processed successfully.",
      totalCredit
    );
  }

  async depositFunds(deposit: Deposit): Promise<DepositResponse> {
    const account = await accountRepository.findByAccountNumber(
      deposit.accountNumber
    );

    if (!account) {
      throw new Error("Could Not Find Account");
    }

    if (account.type === AccountType.Credit) {
      throw new Error("Invalid Account Type");
    }

    const balance = deposit.amount + account.amount!;
    await accountRepository.updateAmount(deposit.accountNumber, balance);

    return new DepositResponse("Deposit processed successfully.", balance);
  }

  async depositCredit(deposit: Deposit): Promise<DepositResponse> {
    const account = await accountRepository.findByAccountNumber(
      deposit.accountNumber
    );

    if (!account) {
      throw new Error("Could Not Find Account");
    }

    if (account.type !== AccountType.Credit) {
      throw new Error("Invalid Account Type");
    }

    if (account.amount! === 0) {
      return new DepositResponse("No balance owed.", null);
    }

    const balance = account.amount! + deposit.amount;
    if (balance > 0) {
      return new DepositResponse("Depositing over balanced owed.", null);
    }

    await accountRepository.updateAmount(deposit.accountNumber, balance);
    return new DepositResponse("Deposit processed successfully.", balance);
  }
}

export default new AccountService();
