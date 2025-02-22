import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components";

vi.mock("next/navigation", () => ({
  useRouter() {},
  usePathname() {},
}));

test("Navbar renders", () => {
  render(<Navbar />);
  expect(screen.getByText(/budget tracker/i)).toBeDefined();
  //
});
