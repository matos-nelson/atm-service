import { Router } from "express";
import AccountController from "../controllers/account.controller";

class AccountRoutes {
  router = Router();
  accountController = new AccountController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/:accountNumber", this.accountController.getAccountDetails);
  }
}

export default new AccountRoutes().router;