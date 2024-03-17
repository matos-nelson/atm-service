import { Router } from "express";
import { getAccount } from "../controllers/account.controller";

class AccountRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/:accountId", getAccount);
  }
}

export default new AccountRoutes().router;