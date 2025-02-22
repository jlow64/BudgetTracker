import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { CategoriesChart } from "@/app/dashboard/_components";

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

test("Category chart renders", async () => {
  render(<CategoriesChart />);
  expect(screen.getAllByText(/expense/i)).toBeDefined();
  const select = screen.getByRole("combobox");
  userEvent.click(select);
  const option = await screen.findByText(/income/i);
  userEvent.click(option);
  expect(screen.getAllByText(/income/i)).toBeDefined();
  //
});
