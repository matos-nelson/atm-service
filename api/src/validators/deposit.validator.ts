import { body } from "express-validator";

export const depositValidator = [
  body("accountNumber", "Account Number Should Not Be Empty").not().isEmpty(),
  body("amount", "Amount should not be empty").not().isEmpty(),
  body(
    "amount",
    "Amount is not a valid number. Should be between 1 and 1000"
  ).isInt({ min: 1, max: 1000 }),
];
