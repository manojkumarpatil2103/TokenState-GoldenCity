import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "../../pages/NotFound.jsx";

describe("NotFound Component", () => {
  test("renders without crashing", () => {
    render(<NotFound />);
  });

  test("displays the correct heading text", () => {
    render(<NotFound />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Page not found");
  });

  test("displays the correct error message", () => {
    render(<NotFound />);
    const errorMessage = screen.getByText(
      "Error 404: The page your're looking for does not exist!"
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("has correct CSS classes for layout and styling", () => {
    const { container } = render(<NotFound />);
    const mainDiv = container.firstChild;

    // Check main container classes
    expect(mainDiv).toHaveClass("min-h-screen");
    expect(mainDiv).toHaveClass("bg-secondary-50");
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("items-center");
    expect(mainDiv).toHaveClass("justify-center");
  });

  test("has correct CSS classes for text content", () => {
    render(<NotFound />);
    const heading = screen.getByRole("heading", { level: 1 });
    const textContainer = heading.parentElement;

    // Check heading classes
    expect(heading).toHaveClass("text-4xl");
    expect(heading).toHaveClass("md:text-5xl");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("mb-6");

    // Check text container class
    expect(textContainer).toHaveClass("text-center");
  });

  test("has correct CSS class for error message", () => {
    render(<NotFound />);
    const errorMessage = screen.getByText(
      "Error 404: The page your're looking for does not exist!"
    );
    expect(errorMessage).toHaveClass("text-xl");
  });

  test("component structure is correct", () => {
    const { container } = render(<NotFound />);

    // Check that we have the expected DOM structure
    const mainDiv = container.firstChild;
    const textCenter = mainDiv.firstChild;
    const heading = textCenter.firstChild;
    const paragraph = textCenter.lastChild;

    expect(mainDiv.tagName).toBe("DIV");
    expect(textCenter.tagName).toBe("DIV");
    expect(heading.tagName).toBe("H1");
    expect(paragraph.tagName).toBe("P");
  });

  test("all text content is present and accessible", () => {
    render(<NotFound />);

    // Using getByText to ensure text is present and accessible
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Error 404: The page your're looking for does not exist!"
      )
    ).toBeInTheDocument();
  });

  test("heading has proper semantic structure", () => {
    render(<NotFound />);
    const headings = screen.getAllByRole("heading");

    // Should only have one heading
    expect(headings).toHaveLength(1);

    // Should be h1 level
    expect(headings[0]).toHaveProperty("tagName", "H1");
  });

  test("component matches snapshot", () => {
    const { container } = render(<NotFound />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
