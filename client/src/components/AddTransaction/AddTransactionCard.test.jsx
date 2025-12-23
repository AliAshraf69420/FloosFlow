import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTransactionCard from "./AddTransactionCard";
import transactionService from "../../services/transactionService";
import { useUser } from "../../context/UserContext";
import { BrowserRouter } from "react-router-dom";

// Mock transactionService
jest.mock("../../services/transactionService");

// Mock useUser context
jest.mock("../../context/UserContext");

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddTransactionCard", () => {
  const mockUser = {
    cards: [
      { id: 1, bankName: "Bank A", cardType: "Visa", cardNumber: "1234567890123456", balance: 1000 },
      { id: 2, bankName: "Bank B", cardType: "Mastercard", cardNumber: "9876543210987654", balance: 500 },
    ],
  };

  beforeEach(() => {
    useUser.mockReturnValue({ user: mockUser });
    transactionService.addTransaction.mockClear();
    mockNavigate.mockClear();
  });

  test("renders the form with inputs and button", () => {
    render(
      <BrowserRouter>
        <AddTransactionCard />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/transaction name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount spent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/merchant name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add transaction/i })).toBeInTheDocument();
  });

  test("allows typing in inputs", () => {
    render(
      <BrowserRouter>
        <AddTransactionCard />
      </BrowserRouter>
    );

    const nameInput = screen.getByLabelText(/transaction name/i);
    fireEvent.change(nameInput, { target: { value: "Lunch" } });
    expect(nameInput.value).toBe("Lunch");

    const amountInput = screen.getByLabelText(/amount spent/i);
    fireEvent.change(amountInput, { target: { value: "50" } });
    expect(amountInput.value).toBe("50");
  });

  test("submits form and calls transactionService", async () => {
    transactionService.addTransaction.mockResolvedValue({});

    render(
      <BrowserRouter>
        <AddTransactionCard />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/transaction name/i), { target: { value: "Lunch" } });
    fireEvent.change(screen.getByLabelText(/amount spent/i), { target: { value: "50" } });

    const button = screen.getByRole("button", { name: /add transaction/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(transactionService.addTransaction).toHaveBeenCalledWith(
        expect.objectContaining({
          transactionName: "Lunch",
          money: 50,
          cardId: 1,
        })
      );
    });

    // Verify navigation
    expect(mockNavigate).toHaveBeenCalledWith("/Transactions");
  });

  test("disables submit button when no cards", () => {
    useUser.mockReturnValue({ user: { cards: [] } });

    render(
      <BrowserRouter>
        <AddTransactionCard />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /add transaction/i });
    expect(button).toBeDisabled();
  });
});
