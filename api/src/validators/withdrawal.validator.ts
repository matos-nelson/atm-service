import { body } from "express-validator";

export const withdrawalValidator = [
  body("accountNumber", "Account Number Should Not Be Empty").not().isEmpty(),
  body("amount", "Amount should not be empty").not().isEmpty(),
  body(
    "amount",
    "Amount is not a valid number. Should be between 5 and 200"
  ).isInt({ min: 5, max: 200 }),
  body("amount", "Amount can only be dispensed in $5 bills").custom(
    (value) => value % 5 === 0
  ),
];
