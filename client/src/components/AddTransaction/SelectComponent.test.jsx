import { render, screen, fireEvent } from "@testing-library/react";
import StyledDropdown from "./SelectComponent";

describe("StyledDropdown", () => {
  test("renders with initial value", () => {
    render(<StyledDropdown value="Other" onChange={jest.fn()} />);
    expect(screen.getByRole("button")).toHaveTextContent("Other");
  });

  test("opens and closes dropdown when button is clicked", () => {
    render(<StyledDropdown value="Other" onChange={jest.fn()} />);

    const button = screen.getByRole("button");

    // Dropdown should not be visible initially
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    // Click to open
    fireEvent.click(button);
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Click to close
    fireEvent.click(button);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("calls onChange with selected item and closes dropdown", () => {
    const handleChange = jest.fn();
    render(<StyledDropdown value="Other" onChange={handleChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button); // open

    const item = screen.getByText("Groceries");
    fireEvent.click(item);

    expect(handleChange).toHaveBeenCalledWith("Groceries");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
