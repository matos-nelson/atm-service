-- CREATE TABLE
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    account_number INTEGER PRIMARY KEY,
    name VARCHAR NOT NULL,
    amount INTEGER NOT NULL,
    type VARCHAR NOT NULL,
    credit_limit INTEGER
);

DROP TABLE IF EXISTS account_history;
CREATE TABLE account_history (
    id SERIAL PRIMARY KEY,
    account_number INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    event VARCHAR NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE accounts ADD CONSTRAINT verify_type
CHECK (type IN ('checking', 'savings', 'credit'));

ALTER TABLE account_history ADD CONSTRAINT verify_event
CHECK (event IN ('withdraw', 'deposit'));

CREATE INDEX idx_account_number
ON account_history(account_number);

CREATE INDEX idx_created_at
ON account_history(created_at);

-- LOAD DATAS
INSERT INTO accounts
    (account_number, name, amount, type, credit_limit)
VALUES
    (1, 'Johns Checking', 1000, 'checking', NULL),
    (2, 'Janes Savings', 2000, 'savings', NULL),
    (3, 'Jills Credit', -3000, 'credit', 10000),
    (4, 'Bobs Checking', 40000, 'checking', NULL),
    (5, 'Bills Savings', 50000, 'savings', NULL),
    (6, 'Bills Credit', -60000, 'credit', 60000),
    (7, 'Nancy Checking', 70000, 'checking', NULL),
    (8, 'Nancy Savings', 80000, 'savings', NULL),
    (9, 'Nancy Credit', -90000, 'credit', 100000);