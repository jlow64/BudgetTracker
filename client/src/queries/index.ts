export const transactionQuery = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction`
  );
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return await response.json();
};
