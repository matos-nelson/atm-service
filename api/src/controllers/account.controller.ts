import { Request, Response } from "express";
import accountService from "../services/account.service";

export default class AccountController {

  async getAccountDetails(req: Request, res: Response): Promise<Response> {

    const accountNumber: number = parseInt(req.params.accountNumber);
    try {
      const accountDetails = await accountService.getAccountDetails(accountNumber);
      if (!accountDetails) {
        return res.status(204).send({
          message: `Cannot find Account with number: ${accountNumber}.`
        });
      }

      return res.status(200).send(accountDetails);
    } catch (err) {
      return res.status(500).send({
        message: `Error retrieving account details with account number: ${accountNumber}.`
      });
    }
  }
}