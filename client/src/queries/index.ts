import { ICategory, ITransaction } from "@/types";

export async function accountGetQuery<T>(userId?: string | null) {
  if (!userId) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account/${userId}`
  );
  return (await response.json()) as Promise<{ id: string; userId: string }>;
}

export const accountCreateQuery = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account`
  );
  return await response.json();
};

export async function transactionQuery(
  userId?: string | null,
  accountId?: string | null
) {
  if (!userId || !accountId) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction?UserId=${userId}&AccountId=${accountId}`
  );
  return (await response.json()) as Promise<ITransaction[]>;
}

export async function categoryQuery(userId?: string | null) {
  if (!userId) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category?UserId=${userId}`
  );
  return (await response.json()) as Promise<ICategory[]>;
}
