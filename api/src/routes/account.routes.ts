import { Router } from "express";
import AccountController from "../controllers/account.controller";

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
      this.accountController.checkingWithdraw
    );
    this.router.patch(
      "/saving/withdraw",
      this.accountController.savingWithdraw
    );
    this.router.patch(
      "/credit/withdraw",
      this.accountController.creditWithdraw
    );
  }
}

export default new AccountRoutes().router;
