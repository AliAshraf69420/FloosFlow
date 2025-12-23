import { render, screen } from "@testing-library/react";
import DashboardCard from "./DashboardCard";

describe("DashboardCard", () => {
  test("renders the title", () => {
    render(<DashboardCard title="My Card" />);
    expect(screen.getByText("My Card")).toBeInTheDocument();
  });

  test("renders children content", () => {
    render(
      <DashboardCard title="My Card">
        <p>Card Content</p>
      </DashboardCard>
    );
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  test("renders actions if provided", () => {
    render(
      <DashboardCard
        title="My Card"
        actions={<button>Click Me</button>}
      />
    );
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("does not render actions if not provided", () => {
    render(<DashboardCard title="My Card" />);
    // Check that the actions container is not in the DOM
    const actionsContainer = screen.queryByRole("button");
    expect(actionsContainer).not.toBeInTheDocument();
  });
});
