import {
  ICategory,
  ICategoryDTO,
  ITransaction,
  ITransactionDTO,
} from "@/common/types";

export async function accountGetQuery<T>(userId?: string | null) {
  if (!userId) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account/${userId}`
  );
  return await response.json();
}

export const accountPostQuery = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/account`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    }
  );
  return await response.json();
};

export async function transactionGetQuery(
  userId?: string | null,
  accountId?: string | null
) {
  if (!userId || !accountId) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction?UserId=${userId}&AccountId=${accountId}`
  );
  return (await response.json()) as Promise<ITransaction[]>;
}
export async function transactionPostQuery(body: ITransactionDTO) {
  if (!body) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return (await response.json()) as Promise<ITransaction>;
}

export async function transactionDeleteQuery(id: string) {
  if (!id) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction/${id}`,
    {
      method: "DELETE",
    }
  );
  return (await response.json()) as Promise<ITransaction>;
}

export async function categoryGetQuery(userId?: string | null) {
  if (!userId) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category?UserId=${userId}`
  );
  return (await response.json()) as Promise<ICategory[]>;
}

export async function categoryPostQuery(body: ICategoryDTO) {
  if (!body) return;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return (await response.json()) as Promise<ICategory>;
}
