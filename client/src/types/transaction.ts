export enum TransactionTypeEnum {
  Income,
  Expense,
}
export type ITransaction = {
  id: number;
  name: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionTypeEnum;
  category: string;
};
export type ICategory = {
  id: number;
  name: string;
  type: TransactionTypeEnum;
  userId: string;
};
