import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { DatePicker } from "@/components";

Element.prototype.scrollIntoView = vi.fn();
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

test("Combobox renders and can select a value", async () => {
  render(<DatePicker />);
  expect(screen.getByText(/pick a date/i)).toBeDefined();
  userEvent.click(screen.getByRole("button"));
  const date = await screen.findByText(11);
  expect(date).toBeDefined();
  userEvent.click(date);
  expect(screen.findByText(/11th/i)).toBeDefined();
});
