import { render, screen, fireEvent } from "@testing-library/react";
import AddTransactionButton from "./AddTransactionButton";

describe("AddTransactionButton", () => {
  test("renders the button with text", () => {
    render(
      <AddTransactionButton type="button">
        Add Transaction
      </AddTransactionButton>
    );

    const button = screen.getByRole("button", {
      name: /add transaction/i,
    });

    expect(button).toBeInTheDocument();
  });

  test("applies the correct type attribute", () => {
    render(
      <AddTransactionButton type="submit">
        Submit
      </AddTransactionButton>
    );

    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();

    render(
      <AddTransactionButton type="button" onClick={handleClick}>
        Click Me
      </AddTransactionButton>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
