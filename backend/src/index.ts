import * as fs from "fs";

export enum TransactionTypes {
  INCOMPLETE = "INCOMPLETE",
  PURCHASED = "PURCHASED",
  REFUND = "REFUND",
}

export interface TransactionHistoryItem {
  name: string;
  numberOfShares: number;
  dateOfPurchase: number;
  status: TransactionTypes;
}

interface InvestorScore {
  name: string;
  totalShares: number;
  weight: number;
}

const isTransactionType = (v: any): v is TransactionTypes => {
  return Object.values(TransactionTypes).includes(v);
}

export const getDiffInMonths = (d1: Date, d2: Date): number => {
  const diffYears = d1.getUTCFullYear() - d2.getUTCFullYear();
  const diffMonths = d1.getUTCMonth() - d2.getUTCMonth();
  return diffYears * 12 + diffMonths;
}

export const getItemWeight = (
  now: Date,
  { status, dateOfPurchase, numberOfShares }: TransactionHistoryItem,
): number => {
  if (status === TransactionTypes.REFUND) {
    return -1;
  }
  if (status === TransactionTypes.INCOMPLETE) {
    return 0;
  }
  // I know that nested ifs are generally not good, but I think there's a
  // strong argument for using them where your logic is terse so that the flow
  // of your code is more readable
  if (status === TransactionTypes.PURCHASED) {
    if (getDiffInMonths(now, new Date(dateOfPurchase)) <= 6) {
      return 1.5;
    }
    if (numberOfShares > 1000) {
      return 1.25;
    }
    return 1;
  }
  // Ideally this would have an item id or name added to the error for logging
  throw new Error('could not determine weight for item'); // should never hit this error
}

export function decodeItem(item: unknown): TransactionHistoryItem {
  // Ideally this would be done using io-ts/yup/etc. to remove the boilerplate
  if (item === null || typeof item !== 'object') {
    throw new Error('item found which was not an object');
  }
  const {
    status,
    numberOfShares,
    dateOfPurchase: dopStr,
    name,
    ...rest
  } = (item as {[k: string]: unknown});
  if (typeof name !== 'string') {
    throw new Error('name was not a string');
  }
  if (!isTransactionType(status)) {
    throw new Error('invalid status');
  }
  if (typeof numberOfShares !== 'number') {
    throw new Error('numberOfShares was not a number');
  }
  if (numberOfShares < 0) {
    throw new Error('numberOfShares was less than zero');
  }
  if (typeof dopStr !== 'string') {
    throw new Error('dateOfPurchase was not a string');
  }
  // Ideally this would be parsed and the difference calculated using date-fns:
  // `Date.parse()` can do weird inconsistent things unless the date is
  // formatted correctly, and working with dates really needs a library,
  // particularly when you get below the scale of months
  const dateOfPurchase = Date.parse(dopStr);
  if (Number.isNaN(dateOfPurchase)) {
    throw new Error('dateOfPurchase could not be parsed');
  }
  if (Object.keys(rest).length > 0) {
    throw new Error('unknown keys in object');
  }
  return { name, numberOfShares, dateOfPurchase, status };
}

const byWeightDesc = (i1: InvestorScore, i2: InvestorScore) => i2.weight - i1.weight;

export const sortInvestorsByPortfolioWeight = (now: Date, data: unknown) => {
  // Validate root
  if (!Array.isArray(data)) {
    // I would normally annotate this further up the call chain and add details
    // for debugging, e.g. the name of the file in this case
    throw new Error('root is not an array');
  }

  // Old-school loop: this is on the hot path and a reduce() would be slower
  //
  // We also avoid breaking it out into separate phases for validation and
  // processing to take advantage of cache locality and avoid two array
  // traversals
  const investorScores: {[name: string]: InvestorScore} = {};
  for (const unsafeItem of data) {
    let item: TransactionHistoryItem;
    try {
      item = decodeItem(unsafeItem);
    } catch (e) {
      // Ideally we'd wrap the original error in an ES2022-compliant way, e.g.
      // `throw new Error('item validation failed', { cause: e });`
      throw new Error('item validation failed');
    }
    const weight = getItemWeight(now, item);
    investorScores[item.name] = investorScores[item.name] || { name: item.name, weight: 0, totalShares: 0 };
    investorScores[item.name].weight += weight * item.numberOfShares;
    investorScores[item.name].totalShares += item.numberOfShares;
  }

  // When the array is smaller then per-loop overhead doesn't matter so much,
  // and it's okay to use the helpful array methods
  //
  // This is a blind assumption from me, and in real-world code I'd validate
  // that there are a feasible number of total investorScores
  const sortedInvestorScores = Object.values(investorScores).sort(byWeightDesc);
  return sortedInvestorScores;
}

export const main = () => {
  const data = fs.readFileSync("./src/transaction_history.json", "utf-8");

  // Set one single instant as `now` so report is consistent
  const now = new Date();
  // JSON.parse likes to give us `any`; it is actually `unknown`!
  const parsedData = JSON.parse(data) as unknown;
  const sortedInvestors = sortInvestorsByPortfolioWeight(now, parsedData);

  // Log and exit
  console.table(sortedInvestors);
};

main();
