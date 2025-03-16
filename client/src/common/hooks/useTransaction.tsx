"use client";

import { transactionGetQuery } from "@/common/queries";
import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "./useAccount";

export const useTransaction = () => {
  const { user } = useUser();
  const { accountData } = useAccount();

  const userId = user?.sub;
  const accountId = accountData?.id;

  const { isPending: isTransactionsPending, data: transactionsData } = useQuery(
    {
      queryKey: ["transactionData", userId, accountId],
      queryFn: async () => transactionGetQuery(userId, accountId),
      enabled: !!userId && !!accountId,
    }
  );

  return { isTransactionsPending, transactionsData };
};
