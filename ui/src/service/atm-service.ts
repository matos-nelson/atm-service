import http from "../http-common";
import { AccountDetails } from "../dto/account-details";
import { WithdrawalResponse } from "../dto/withdraw-response";
import { DepositResponse } from "../dto/deposit-response";

export const getAccountDetails = async (
  accountNumber: number
): Promise<AccountDetails> => {
  const { data } = await http.get<AccountDetails>(
    `/account/details/${accountNumber}`
  );
  return data;
};

export const withdraw = async (
  accountNumber: number,
  accountType: string,
  amount: number
): Promise<WithdrawalResponse> => {
  const { data } = await http.patch<WithdrawalResponse>(
    `/account/` + accountType + `/withdraw`,
    {
      accountNumber: accountNumber,
      amount: amount,
    }
  );
  return data;
};

export const depositFunds = async (
  accountNumber: number,
  amount: number
): Promise<DepositResponse> => {
  const { data } = await http.patch<DepositResponse>(`/account/deposit`, {
    accountNumber: accountNumber,
    amount: amount,
  });
  return data;
};

export const depositCredit = async (
  accountNumber: number,
  amount: number
): Promise<DepositResponse> => {
  const { data } = await http.patch<DepositResponse>(
    `/account/credit/deposit`,
    {
      accountNumber: accountNumber,
      amount: amount,
    }
  );
  return data;
};
