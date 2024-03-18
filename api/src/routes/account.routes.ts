import { Router } from "express";
import AccountController from "../controllers/account.controller";
import { validationResult } from "express-validator";
import { withdrawalValidator } from "../validators/withdrawal.validator";

class AccountRoutes {
  router = Router();
  accountController = new AccountController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get(
      "/balance/:accountNumber",
      this.accountController.getAccountDetails
    );
    this.router.patch(
      "/checking/withdraw",
      withdrawalValidator,
      this.accountController.checkingWithdraw
    );
    this.router.patch(
      "/saving/withdraw",
      withdrawalValidator,
      this.accountController.savingWithdraw
    );
    this.router.patch(
      "/credit/withdraw",
      withdrawalValidator,
      this.accountController.creditWithdraw
    );
  }
}

export default new AccountRoutes().router;
