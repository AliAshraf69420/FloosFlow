import { render, screen, fireEvent } from "@testing-library/react";
import HelpForm from "./HelpForm";

describe("HelpForm", () => {
  test("renders all input fields and submit button", () => {
    render(<HelpForm />);
    
    expect(screen.getByLabelText(/Full-Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    
    expect(screen.getByRole("button", { name: /Send message/i })).toBeInTheDocument();
  });

  test("can type into input fields", () => {
    render(<HelpForm />);
    
    const fullName = screen.getByLabelText(/Full-Name/i);
    const email = screen.getByLabelText(/Email/i);
    const message = screen.getByLabelText(/Message/i);
    
    fireEvent.change(fullName, { target: { value: "Ali Ashraf" } });
    fireEvent.change(email, { target: { value: "ali@example.com" } });
    fireEvent.change(message, { target: { value: "Help me!" } });
    
    expect(fullName.value).toBe("Ali Ashraf");
    expect(email.value).toBe("ali@example.com");
    expect(message.value).toBe("Help me!");
  });
});
