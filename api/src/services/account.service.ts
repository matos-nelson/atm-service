import accountRepository from "../repositories/account.repository";
import { AccountDetails } from "../dto/account-details.dto";

class AccountService {
    async getAccountDetails(accountNumber: number) : Promise<AccountDetails | null> {
        const account = await accountRepository.findByAccountNumber(accountNumber);
        if (!account) {
            return null;
        }

        return new AccountDetails(account.name!, account.amount!, account.type!, account.creditLimit);
    }
}

export default new AccountService();