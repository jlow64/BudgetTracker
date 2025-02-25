export const transactionQuery = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/transaction`
  );
  return await response.json();
};
