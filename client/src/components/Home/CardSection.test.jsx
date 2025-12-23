import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CardSection from "./CardSection";
import cardService from "../../services/cardService";
import { useNavigate } from "react-router-dom";

jest.mock("../../services/cardService");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("CardSection", () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    cardService.getAllCards.mockReturnValue(new Promise(() => {}));
    render(<CardSection />);
    expect(screen.getByRole("status", { hidden: true })).toBeInTheDocument();
  });

  test("renders no cards state", async () => {
    cardService.getAllCards.mockResolvedValue([]);
    render(<CardSection />);
    await waitFor(() => {
      expect(screen.getByText("No Cards Added Yet")).toBeInTheDocument();
      expect(screen.getByText("Add Your First Card")).toBeInTheDocument();
      expect(screen.getByText("Transfer Money")).toBeInTheDocument();
    });
  });

  test("renders cards and allows selection", async () => {
    const cards = [
      { id: 1, cardNumber: "1234", cardHolder: "Alice", balance: 100, cardType: "VISA", expiryDate: "12/25" },
      { id: 2, cardNumber: "5678", cardHolder: "Bob", balance: 200, cardType: "MASTERCARD", expiryDate: "11/24" },
    ];
    cardService.getAllCards.mockResolvedValue(cards);
    cardService.selectReceivingCard = jest.fn().mockResolvedValue();

    render(<CardSection />);
    await waitFor(() => screen.getByText("Alice"));

    // Switch to next card
    fireEvent.click(screen.getByLabelText("Next card"));
    expect(screen.getByText("Bob")).toBeInTheDocument();

    // Choose as receiving card
    window.alert = jest.fn();
    fireEvent.click(screen.getByText("Choose as Receiving Card"));
    await waitFor(() => {
      expect(cardService.selectReceivingCard).toHaveBeenCalledWith(2);
      expect(window.alert).toHaveBeenCalledWith("Card selected for receiving successfully!");
    });
  });

  test("navigates to manage cards", async () => {
    cardService.getAllCards.mockResolvedValue([]);
    render(<CardSection />);
    await waitFor(() => screen.getByText("Add Your First Card"));
    fireEvent.click(screen.getByText("Add Your First Card"));
    expect(mockNavigate).toHaveBeenCalledWith("/ManageCards");
  });
});
