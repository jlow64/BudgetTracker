export enum TransactionTypeEnum {
  Income,
  Expense,
}
export type ITransaction = {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionTypeEnum;
  category: string;
};
export type ITransactionDTO = Omit<ITransaction, "id" | "category" | "date"> & {
  date: Date;
  accountId: string;
  categoryId: string;
};
export type ICategory = {
  id: number;
  name: string;
  type: TransactionTypeEnum;
  userId: string;
};
export type ICategoryDTO = Omit<ICategory, "id">;
