import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { CashflowChart } from "@/app/dashboard/_components";

window.PointerEvent = class PointerEvent extends Event {} as any;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

test("Cashflow chart renders", async () => {
  render(<CashflowChart />);
  expect(screen.getByText(/last 7 days/i)).toBeDefined();
  expect(screen.getByText(/\$0/i)).toBeDefined();
  const select = screen.getByRole("combobox");
  userEvent.click(select);
  const option = await screen.findByText(/last 30 days/i);
  userEvent.click(option);
  expect(screen.getAllByText(/last 30 days/i)).toBeDefined();
  //
});
