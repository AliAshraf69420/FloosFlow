import { render, screen } from "@testing-library/react";
import PieChart from "./PieChart";

// Mock ChartJS Pie component
jest.mock("react-chartjs-2", () => ({
  Pie: () => <div data-testid="pie-chart" />,
}));

describe("PieChart", () => {
  test("renders with empty data", () => {
    render(<PieChart />);
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
  });

  test("renders with chartData", () => {
    const data = {
      data: [
        { label: "Groceries", percentage: 40 },
        { label: "Transport", percentage: 60 },
      ],
    };
    render(<PieChart chartData={data} />);
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();

    // Legend labels
    expect(screen.getByText(/Groceries/i)).toBeInTheDocument();
    expect(screen.getByText(/Transport/i)).toBeInTheDocument();
  });
});
