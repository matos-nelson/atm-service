import { Router } from "express";
import AccountController from "../controllers/account.controller";
import { validationResult } from "express-validator";
import { withdrawalValidator } from "../validators/withdrawal.validator";
import { depositValidator } from "../validators/deposit.validator";

class AccountRoutes {
  router = Router();
  accountController = new AccountController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get(
      "/details/:accountNumber",
      this.accountController.getAccountDetails
    );
    this.router.patch(
      "/checking/withdraw",
      withdrawalValidator,
      this.accountController.checkingWithdraw
    );
    this.router.patch(
      "/savings/withdraw",
      withdrawalValidator,
      this.accountController.savingWithdraw
    );
    this.router.patch(
      "/credit/withdraw",
      withdrawalValidator,
      this.accountController.creditWithdraw
    );
    this.router.patch(
      "/deposit",
      depositValidator,
      this.accountController.depositFunds
    );
    this.router.patch(
      "/credit/deposit",
      depositValidator,
      this.accountController.depositCredit
    );
  }
}

export default new AccountRoutes().router;
