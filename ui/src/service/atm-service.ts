import http from "../http-common";
import { AccountDetails } from "../dto/account-details";

const getAccountDetails = async (
  accountNumber: number
): Promise<AccountDetails> => {
  const { data } = await http.get<AccountDetails>(`/account/${accountNumber}`);
  console.log(data);
  return data;
};
