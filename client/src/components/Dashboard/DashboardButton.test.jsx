import { render, screen, fireEvent } from "@testing-library/react";
import DashboardButton from "./DashboardButton";

describe("DashboardButton", () => {
  test("renders with children text", () => {
    render(<DashboardButton>Click Me</DashboardButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Click Me");
  });

  test("renders with image when imgSrc is provided", () => {
    render(<DashboardButton imgSrc="icon.png" imgAlt="icon">Click Me</DashboardButton>);
    const img = screen.getByAltText("icon");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "icon.png");
  });

  test("handles onClick", () => {
    const handleClick = jest.fn();
    render(<DashboardButton onClick={handleClick}>Click Me</DashboardButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
