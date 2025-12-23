import { render, screen } from "@testing-library/react";
import HelpInfo from "./HelpInfo";

describe("HelpInfo", () => {
  test("renders FAQ heading", () => {
    render(<HelpInfo />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  test("renders all FAQ questions", () => {
    render(<HelpInfo />);
    const questions = [
      "How do I reset my password?",
      "How do I create a new FloosFlow account?",
      "Why is my transaction not showing up?",
      "How can I contact customer support?"
    ];
    questions.forEach((q) => expect(screen.getByText(q)).toBeInTheDocument());
  });

  test("renders support email link", () => {
    render(<HelpInfo />);
    const emailLink = screen.getByText("support@floosflow.com");
    expect(emailLink).toHaveAttribute("href", "mailto:support@floosflow.com");
  });
});
