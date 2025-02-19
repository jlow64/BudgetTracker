export enum TransactionTypeEnum {
  Expense,
  Income,
}
export type ITransaction = {
  id: number;
  name: string;
  description: string;
  amount: number;
  timeStamp: string;
  type: TransactionTypeEnum;
  category: string;
};
