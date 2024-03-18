export class DepositResponse {
  message: string | null;
  balance: number | null;

  public constructor(message: string | null, balance: number | null) {
    this.message = message;
    this.balance = balance;
  }
}
