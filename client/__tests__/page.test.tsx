import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

test("the landing page renders", () => {
  render(<Page />);
  expect(screen.getAllByText(/Lets budget together!/i));
  expect(
    screen.getAllByRole("heading", {
      name: /get your spending habits tracked today./i,
    })
  );
  expect(screen.getAllByText(/Know your spending!/i));
  expect(screen.getAllByText(/Easy to use!/i));

  expect(screen.getByText(/Ready to get started?/i));
  expect(screen.getByRole("button", { name: /start now/i }));
});
