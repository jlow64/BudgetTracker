import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { TransactionsCard } from "@/app/dashboard/_components";

test("Transaction card renders", async () => {
  render(<TransactionsCard />);
  expect(screen.getByText(/transactions log/i)).toBeDefined();
});
