"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useQuery } from "@tanstack/react-query";
import { categoryGetQuery } from "@/common/queries";

export const useCategory = () => {
  const { user } = useUser();

  const userId = user?.sub;

  const { isPending: isCategoriesPending, data: categoriesData } = useQuery({
    queryKey: ["categoryData", userId],
    queryFn: async () => categoryGetQuery(userId),
    enabled: !!userId,
  });

  return { isCategoriesPending, categoriesData };
};
