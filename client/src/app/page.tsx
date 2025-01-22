"use client";

import { useQuery } from "@tanstack/react-query";

type ITransaction = {
  id: number;
  name: string;
  price: number;
};

export default function Home() {
  const classes = {
    container: "size-full border border-blue-500",
  };
  const { isPending, data } = useQuery({
    queryKey: ["transactionData"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/transaction`
      );
      return await response.json();
    },
  });

  if (isPending) return <h1>Loading...</h1>;

  return (
    <div className={classes.container}>
      <h1>Home</h1>
      <div>
        {data.map((el: ITransaction) => (
          <p key={el.id}>
            {el.name} costs: {el.price}
          </p>
        ))}
      </div>
    </div>
  );
}
