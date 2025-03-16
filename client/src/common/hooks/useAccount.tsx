"use client";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountGetQuery, accountPostQuery } from "@/common/queries";
import { toast } from "sonner";

export const useAccount = () => {
  const { user } = useUser();

  const userId = user?.sub;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userId: string) => accountPostQuery(userId),
    onSuccess: (d) => {
      const message = d?.name ? `for ${d?.name}` : "";
      toast.success(`Category ${message} has been added successfuly`);
      queryClient.invalidateQueries({
        queryKey: ["categoryData", "transactionData"],
      });
    },
  });

  const {
    isPending: isAccountPending,
    isSuccess,
    data: accountData,
  } = useQuery({
    queryKey: ["accountData", userId],
    queryFn: async () => accountGetQuery(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && userId && accountData?.status === 404)
      mutation.mutate(userId);
  }, [isSuccess, accountData, userId]);

  return { isAccountPending, accountData };
};
