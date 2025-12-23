// NavBar.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

// Mock context hooks
jest.mock("../context/UserContext", () => ({
  useUser: jest.fn(),
}));

jest.mock("../context/NotificationsContext", () => ({
  useNotifications: jest.fn(),
}));

jest.mock("./SearchBar", () => () => <div data-testid="searchbar">SearchBar</div>);

describe("NavBar component", () => {
  const { useUser } = require("../context/UserContext");
  const { useNotifications } = require("../context/NotificationsContext");

  beforeEach(() => {
    useNotifications.mockReturnValue({ unreadCount: 0 });
  });

  test("renders loading message", () => {
    useUser.mockReturnValue({ user: null, loading: true, error: null });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading user data.../i)).toBeInTheDocument();
  });

  test("renders error message", () => {
    useUser.mockReturnValue({ user: null, loading: false, error: "Failed" });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    expect(screen.getByText(/Error loading user: Failed/i)).toBeInTheDocument();
  });

  test("renders main menu links", () => {
    useUser.mockReturnValue({ user: { profileImage: "" }, loading: false, error: null });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    ["Home", "Services", "Dashboard", "Help"].forEach((label) => {
      expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    });
  });

  test("displays notification badge when unreadCount > 0", () => {
    useUser.mockReturnValue({ user: { profileImage: "" }, loading: false, error: null });
    useNotifications.mockReturnValue({ unreadCount: 5 });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const badge = screen.getByRole("link", { name: /View notifications/i }).querySelector("span");
    expect(badge).toBeInTheDocument();
  });

  test("displays user profile image", () => {
    useUser.mockReturnValue({ user: { profileImage: "profile.png" }, loading: false, error: null });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
    const img = screen.getByAltText("User profile picture");
    expect(img).toHaveAttribute("src", "profile.png");
  });

  test("toggles mobile menu on button click", () => {
    useUser.mockReturnValue({ user: { profileImage: "" }, loading: false, error: null });
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const button = screen.getByLabelText(/Toggle menu/i);
    fireEvent.click(button);

    const mobileMenu = screen.getByRole("menu", { name: /Mobile Main Menu/i });
    expect(mobileMenu).toHaveClass("flex");
  });
});
