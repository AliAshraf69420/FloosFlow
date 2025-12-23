import React from "react";
import { render, screen } from "@testing-library/react";
import WelcomeCard from "./WelcomeCard";
import { useUser } from "../../context/UserContext";

jest.mock("../../context/UserContext");

describe("WelcomeCard component", () => {
  afterEach(() => jest.clearAllMocks());

  test("renders loading state", () => {
    useUser.mockReturnValue({ user: null, loading: true, error: null });
    render(<WelcomeCard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders error state", () => {
    useUser.mockReturnValue({ user: null, loading: false, error: "Failed" });
    render(<WelcomeCard />);
    expect(screen.getByText("Error loading user info")).toBeInTheDocument();
  });

  test("renders user info correctly", () => {
    useUser.mockReturnValue({
      user: { firstName: "Alice", lastName: "Smith", profileImage: "alice.png" },
      loading: false,
      error: null,
    });
    render(<WelcomeCard />);
    expect(screen.getByText("Welcome, Alice Smith")).toBeInTheDocument();
    expect(screen.getByAltText("Profile Picture")).toHaveAttribute("src", "alice.png");
  });

  test("renders guest when user is null", () => {
    useUser.mockReturnValue({ user: null, loading: false, error: null });
    render(<WelcomeCard />);
    expect(screen.getByText("Welcome, Guest")).toBeInTheDocument();
  });
});
