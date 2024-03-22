import React, { SetStateAction, useState } from "react";
import {
  depositCredit,
  depositFunds,
  getAccountDetails,
  withdraw,
} from "./service/atm-service";
import "./App.css";
import { AccountDetails } from "./dto/account-details";
import { AxiosError } from "axios";

function App() {
  const DEPOSIT = "deposit";
  const WITHDRAW = "withdraw";
  const VIEW_BALANCE = "view_balance";

  const CHECKING = "checking";
  const SAVINGS = "savings";
  const CREDIT = "credit";

  const [accountNumber, setAccountNumber] = useState(0);
  const [amount, setAmount] = useState(0);
  const [accountType, setAccountType] = useState(CHECKING);
  const [selectedOption, setSelectedOption] = useState(VIEW_BALANCE);

  const handleDropdownChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const handleAccountTypeChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAccountType(event.target.value);
  };

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAccountNumber(+event.target.value);
  };

  const handleAmountChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setAmount(+event.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      if (selectedOption === VIEW_BALANCE) {
        await displayAccountBalance();
      } else if (selectedOption === WITHDRAW) {
        await processWithdraw();
      } else if (selectedOption === DEPOSIT) {
        await processDeposit();
      }
      resetForm();
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 400) {
          let message = "";
          e.response.data.errors.forEach(
            (error: any) => (message += error.msg)
          );
          window.alert(message);
        } else {
          if (e.response?.data.message) {
            window.alert(e.response.data.message);
          } else {
            window.alert("Error Processing Request");
          }
        }
      }
    }
  };

  function resetForm(): void {
    setAccountNumber(0);
    setAmount(0);
    setAccountType(CHECKING);
    setSelectedOption(VIEW_BALANCE);
  }

  async function displayAccountBalance(): Promise<void> {
    const accountDetails: AccountDetails = await getAccountDetails(
      accountNumber
    );

    if (accountDetails) {
      window.alert("Balance: " + accountDetails.amount);
    } else {
      window.alert("No Account Found");
    }
  }

  async function processWithdraw(): Promise<void> {
    const response = await withdraw(accountNumber, accountType, amount);
    if (response) {
      let message = response.message;
      if (response.balance) {
        message += "\nNew Balance: " + response.balance;
      }
      window.alert(message);
    }
  }

  async function processDeposit(): Promise<void> {
    const response =
      accountType === CREDIT
        ? await depositCredit(accountNumber, amount)
        : await depositFunds(accountNumber, amount);
    if (response) {
      let message = response.message;
      if (response.balance) {
        message += "\nNew Balance: " + response.balance;
      }
      window.alert(message);
    }
  }

  return (
    <div className="center">
      <div>
        <label>
          Select an option:
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value={DEPOSIT}>Deposit</option>
            <option value={WITHDRAW}>Withdraw</option>
            <option value={VIEW_BALANCE}>View Balance</option>
          </select>
        </label>
        {((selectedOption && selectedOption === DEPOSIT) ||
          selectedOption === WITHDRAW) && (
          <div>
            <label>
              Select Account Type:
              <select value={accountType} onChange={handleAccountTypeChange}>
                <option value={CHECKING}>Checkings</option>
                <option value={SAVINGS}>Savings</option>
                <option value={CREDIT}>Credit</option>
              </select>
            </label>
          </div>
        )}
      </div>
      <form>
        <label>
          Account Number:
          <input
            type="number"
            value={accountNumber}
            onChange={handleInputChange}
          />
        </label>
        {(selectedOption === WITHDRAW || selectedOption === DEPOSIT) && (
          <div>
            <label>
              Amount:
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
              />
            </label>
          </div>
        )}
      </form>
      <button onClick={handleSubmit} disabled={!accountNumber}>
        Submit
      </button>
    </div>
  );
}

export default App;
