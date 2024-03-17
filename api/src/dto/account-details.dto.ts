export class AccountDetails {
    name: string
    amount: number
    type: string
    creditLimit: number | undefined

    public constructor(name: string, amount: number, type: string, creditLimit: number | undefined) {
        this.name = name;
        this.amount = amount;
        this.type = type;
        this.creditLimit = creditLimit;
    }
};