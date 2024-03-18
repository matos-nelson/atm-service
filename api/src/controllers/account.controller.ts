import { Request, Response } from "express";
import accountService from "../services/account.service";
import { Withdrawal } from "../dto/withdrawal.dto";
import { AccountType } from "../enums/account-type.enum";
import { validationResult } from "express-validator";
import { Deposit } from "../dto/deposit.dto";

export default class AccountController {
  async getAccountDetails(req: Request, res: Response): Promise<Response> {
    const accountNumber: number = parseInt(req.params.accountNumber);
    try {
      const accountDetails = await accountService.getAccountDetails(
        accountNumber
      );
      if (!accountDetails) {
        return res.status(204).send();
      }

      return res.status(200).send(accountDetails);
    } catch (err) {
      return res.status(500).send({
        message: `Error retrieving account details with account number: ${accountNumber}.`,
      });
    }
  }

  async checkingWithdraw(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    try {
      const withdrawal: Withdrawal = req.body;

      const withdrawalResponse = await accountService.withdrawFunds(
        withdrawal,
        AccountType.Checking
      );

      return res.status(200).send(withdrawalResponse);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message:
          "Some error occurred while processing checking withdrawal request.",
      });
    }
  }

  async savingWithdraw(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    try {
      const withdrawal: Withdrawal = req.body;
      const withdrawalResponse = await accountService.withdrawFunds(
        withdrawal,
        AccountType.Savings
      );

      return res.status(200).send(withdrawalResponse);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message:
          "Some error occurred while processing saving withdrawal request.",
      });
    }
  }

  async creditWithdraw(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    try {
      const withdrawal: Withdrawal = req.body;
      const withdrawalResponse = await accountService.withdrawCredit(
        withdrawal
      );

      return res.status(200).send(withdrawalResponse);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message:
          "Some error occurred while processing credit withdrawal request.",
      });
    }
  }

  async depositFunds(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    try {
      const deposit: Deposit = req.body;
      const depositResponse = await accountService.depositFunds(deposit);

      return res.status(200).send(depositResponse);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Some error occurred while processing deposit request.",
      });
    }
  }

  async depositCredit(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }

    try {
      const deposit: Deposit = req.body;
      const depositResponse = await accountService.depositCredit(deposit);

      return res.status(200).send(depositResponse);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Some error occurred while processing deposit credit request.",
      });
    }
  }
}
