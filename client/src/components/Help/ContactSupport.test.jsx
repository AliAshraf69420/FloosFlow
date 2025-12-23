import { render, screen } from "@testing-library/react";
import ContactSupport from "./ContactSupport";

describe("ContactSupport", () => {
  test("renders heading and description", () => {
    render(<ContactSupport />);
    expect(screen.getByText("Still Need Help?")).toBeInTheDocument();
    expect(
      screen.getByText(/Our team is available 24\/7/i)
    ).toBeInTheDocument();
  });

  test("renders email link", () => {
    render(<ContactSupport />);
    const emailLink = screen.getByRole("link", { name: /email support/i });
    expect(emailLink).toHaveAttribute("href", "mailto:support@floosflow.com");
    expect(emailLink).toHaveTextContent("Contact Support");
  });
});
