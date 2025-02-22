import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CashflowCard } from "@/app/dashboard/_components";

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

test("Cashflow card renders", async () => {
  render(<CashflowCard />);
  expect(screen.getByText(/cashflow/i)).toBeDefined();
  expect(screen.getByText(/income/i)).toBeDefined();
  expect(screen.getByText(/expense/i)).toBeDefined();
  expect(screen.getAllByText(/date/i)).toBeDefined();
  expect(screen.getAllByText(/category/i)).toBeDefined();
  expect(screen.getAllByText(/name/i)).toBeDefined();
  expect(screen.getAllByText(/description/i)).toBeDefined();
  expect(screen.getAllByText(/amount/i)).toBeDefined();
});
