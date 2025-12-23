import { render, screen } from "@testing-library/react";
import { Chart as ChartJS } from "chart.js";
import BarChart from "./BarChart";

// Mock ChartJS components
jest.mock("react-chartjs-2", () => ({
  Bar: () => <div data-testid="bar-chart" />,
}));

describe("BarChart", () => {
  test("renders with empty data", () => {
    render(<BarChart />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  test("renders with provided chartData", () => {
    const data = {
      data: [
        { label: "Groceries", value: 50, percentage: 25 },
        { label: "Transport", value: 150, percentage: 75 },
      ],
    };
    render(<BarChart chartData={data} />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });
});
