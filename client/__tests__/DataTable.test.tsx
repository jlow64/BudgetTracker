import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { columns, DataTable } from "@/app/dashboard/_components";
import userEvent from "@testing-library/user-event";

describe("Data table test cases", () => {
  afterEach(() => cleanup());

  test("Datatable renders", async () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText(/name/i)).toBeDefined();
    expect(screen.getByText(/type/i)).toBeDefined();
    expect(screen.getByText(/amount/i)).toBeDefined();
    expect(screen.getByText(/description/i)).toBeDefined();
    expect(screen.getByText(/category/i)).toBeDefined();
    expect(screen.getByText(/date/i)).toBeDefined();
  });

  test("filter works correctly", async () => {
    render(
      <DataTable
        columns={columns}
        data={[
          {
            id: 123,
            name: "test",
            description: "test-description",
            amount: 25,
            timeStamp: Date.now().toString(),
            type: 0,
            category: "yes",
          },
        ]}
      />
    );
    const input = await screen.findByRole("search");

    userEvent.type(input, "te");
    expect(screen.findByText(/test/i)).toBeDefined();
  });
});
