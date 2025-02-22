import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/dashboard/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const queryClient = new QueryClient();

vi.mock("@/queries", () => ({
  transactionQuery: () => Promise.resolve([]),
}));

test("if the dashboard page renders", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
  // need to mock login info when 0auth is setup
  expect(await screen.findByText(/Welcome Koto, lets get back on track!/i));
  // Check for cards
  expect(screen.getByText(/cashflow/i)).toBeDefined();
  expect(screen.getByText(/categories/i)).toBeDefined();
  expect(screen.getByText(/transactions log/i)).toBeDefined();
  // Check for charts
  expect(screen.findByText(/last 7 days/i)).toBeDefined();
  expect(screen.findByText(/income/i)).toBeDefined();
});
