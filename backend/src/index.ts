import * as fs from "fs";

enum TransactionTypes {
  INCOMPLETE = "INCOMPLETE",
  PURCHASED = "PURCHASED",
  REFUND = "REFUND",
}

interface TransactionHistoryItem {
  name: string;
  numberOfShares: number;
  dateOfPurchase: number;
  status: TransactionTypes;
}

const main = () => {
  const data = fs.readFileSync("./src/transaction_history.json", "utf-8");

  // Your code here
};

main();
