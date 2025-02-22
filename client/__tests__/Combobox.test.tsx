import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Combobox } from "@/components";

Element.prototype.scrollIntoView = vi.fn();
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

test("Combobox renders and can type and select a value", async () => {
  const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  render(<Combobox data={frameworks} />);
  expect(screen.getByText(/select category/i)).toBeDefined();

  userEvent.click(screen.getByRole("combobox"));
  const input = await screen.findByRole("combobox");
  userEvent.type(input, "next");
  const option = await screen.findByText(/next.js/i);
  expect(option).toBeDefined();
  userEvent.click(option);
  expect(screen.findByText(/next.js/i)).toBeDefined();
  //
});
