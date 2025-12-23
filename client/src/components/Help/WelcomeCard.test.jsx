import { render, screen } from "@testing-library/react";
import WelcomeCard from "./WelcomeCard";

describe("WelcomeCard", () => {
  test("renders the image and heading", () => {
    render(<WelcomeCard />);
    const img = screen.getByAltText("Logo");
    const heading = screen.getByText("How can we help you?");
    
    expect(img).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
