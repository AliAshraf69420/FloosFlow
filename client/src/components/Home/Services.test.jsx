import React from "react";
import { render, screen } from "@testing-library/react";
import Service from "./Services";

describe("Service component", () => {
  test("renders label prop", () => {
    render(<Service label="Banking Service" />);
    expect(screen.getByText("Banking Service")).toBeInTheDocument();
  });
});
