import React from "react";
import { render, screen } from "@testing-library/react";
import CreditCard from "./CreditCard";

describe("CreditCard component", () => {
  test("renders default props", () => {
    render(<CreditCard />);
    expect(screen.getByText("WAEL AL ABYD")).toBeInTheDocument();
    expect(screen.getByText(/EGP 25,430.00/)).toBeInTheDocument();
    expect(screen.getByText("**** **** **** 4532")).toBeInTheDocument();
    expect(screen.getByText("Visa")).toBeInTheDocument();
    expect(screen.getByText("12/27")).toBeInTheDocument();
    expect(screen.getByText("FloosFlow")).toBeInTheDocument();
  });

  test("renders custom props", () => {
    render(
      <CreditCard
        cardNumber="1111 2222 3333 4444"
        cardHolder="John Doe"
        balance="5000"
        currency="USD"
        cardType="Mastercard"
        expiryDate="01/30"
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/USD 5000/)).toBeInTheDocument();
    expect(screen.getByText("1111 2222 3333 4444")).toBeInTheDocument();
    expect(screen.getByText("Mastercard")).toBeInTheDocument();
    expect(screen.getByText("01/30")).toBeInTheDocument();
  });
});
