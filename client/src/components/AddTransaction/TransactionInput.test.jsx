import { render, screen, fireEvent } from "@testing-library/react";
import TransactionInput from "./TransactionInput";

describe("TransactionInput", () => {
  test("renders with label and input", () => {
    render(
      <TransactionInput
        label="Transaction Name"
        id="transaction-name"
        value=""
        onChange={() => {}}
      />
    );

    // Label exists
    expect(screen.getByLabelText(/transaction name/i)).toBeInTheDocument();

    // Input exists
    const input = screen.getByRole("textbox", { name: /transaction name/i });
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  test("calls onChange when user types", () => {
    const handleChange = jest.fn();
    render(
      <TransactionInput
        label="Amount"
        id="amount"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByRole("textbox", { name: /amount/i });
    fireEvent.change(input, { target: { value: "100" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test("supports type attribute", () => {
    render(
      <TransactionInput
        label="Amount"
        id="amount"
        type="number"
        value=""
        onChange={() => {}}
      />
    );

    const input = screen.getByRole("spinbutton", { name: /amount/i });
    expect(input).toHaveAttribute("type", "number");
  });
});
