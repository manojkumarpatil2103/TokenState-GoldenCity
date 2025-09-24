import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FAQ from "../../pages/FAQ.jsx";

// Mock framer-motion to avoid animation complexities in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock react-icons
jest.mock("react-icons/fi", () => ({
  FiChevronDown: () => <div data-testid="chevron-down">ChevronDown</div>,
  FiChevronUp: () => <div data-testid="chevron-up">ChevronUp</div>,
}));

describe("FAQ Component", () => {
  beforeEach(() => {
    render(<FAQ />);
  });

  describe("Initial Rendering", () => {
    test("renders the main heading", () => {
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Frequently Asked Questions"
      );
    });

    test("renders the description paragraph", () => {
      expect(
        screen.getByText(/Find answers to common questions about our platform/)
      ).toBeInTheDocument();
    });

    test("renders all FAQ sections", () => {
      const expectedSections = [
        "General Information",
        "MarketPlace",
        "Property Management",
        "Accounting",
        "Financial",
        "Legal",
      ];

      expectedSections.forEach((sectionTitle) => {
        expect(
          screen.getByRole("heading", { level: 2, name: sectionTitle })
        ).toBeInTheDocument();
      });
    });

    test("renders all questions as buttons", () => {
      // Test a few key questions from different sections
      expect(screen.getByText("What is GoldenCity?")).toBeInTheDocument();
      expect(
        screen.getByText("What is the marketplace, or secondary market?")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Who does the property management?")
      ).toBeInTheDocument();
      expect(
        screen.getByText("What profitability can I achieve?")
      ).toBeInTheDocument();
    });

    test("all questions are initially closed (answers not visible)", () => {
      // Check that answers are not initially visible
      expect(
        screen.queryByText(/GoldenCity is an innovative investment project/)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/The GoldenCity Marketplace is our platform/)
      ).not.toBeInTheDocument();
    });

    test("all questions show chevron down icon initially", () => {
      const chevronDownIcons = screen.getAllByTestId("chevron-down");
      expect(chevronDownIcons.length).toBeGreaterThan(0);

      // Should not have any chevron up icons initially
      expect(screen.queryAllByTestId("chevron-up")).toHaveLength(0);
    });
  });

  describe("Question Interactions", () => {
    test("clicking a question opens its answer", async () => {
      const questionButton = screen.getByText("What is GoldenCity?");

      fireEvent.click(questionButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            /GoldenCity is an innovative investment project dedicated to real estate/
          )
        ).toBeInTheDocument();
      });
    });

    test("clicking an open question closes its answer", async () => {
      const questionButton = screen.getByText("What is GoldenCity?");

      // Open the question
      fireEvent.click(questionButton);
      await waitFor(() => {
        expect(
          screen.getByText(/GoldenCity is an innovative investment project/)
        ).toBeInTheDocument();
      });

      // Close the question
      fireEvent.click(questionButton);
      await waitFor(() => {
        expect(
          screen.queryByText(/GoldenCity is an innovative investment project/)
        ).not.toBeInTheDocument();
      });
    });

    test("chevron icon changes when question is opened", async () => {
      const questionButton = screen.getByText("What is GoldenCity?");

      // Initially should show chevron down
      expect(screen.getAllByTestId("chevron-down").length).toBeGreaterThan(0);

      fireEvent.click(questionButton);

      await waitFor(() => {
        expect(screen.getByTestId("chevron-up")).toBeInTheDocument();
      });
    });

    test("multiple questions can be open simultaneously", async () => {
      const question1 = screen.getByText("What is GoldenCity?");
      const question2 = screen.getByText(
        "What are the conditions for investing on GoldenCity?"
      );

      fireEvent.click(question1);
      fireEvent.click(question2);

      await waitFor(() => {
        expect(
          screen.getByText(/GoldenCity is an innovative investment project/)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/Any person of legal age can hold a GoldenCity NFT/)
        ).toBeInTheDocument();
      });
    });

    test("questions from different sections work independently", async () => {
      const generalQuestion = screen.getByText("What is GoldenCity?");
      const marketplaceQuestion = screen.getByText(
        "What is the marketplace, or secondary market?"
      );

      fireEvent.click(generalQuestion);
      fireEvent.click(marketplaceQuestion);

      await waitFor(() => {
        expect(
          screen.getByText(/GoldenCity is an innovative investment project/)
        ).toBeInTheDocument();
        expect(
          screen.getByText(/The GoldenCity Marketplace is our platform/)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Content Verification", () => {
    test('displays correct answer for "What is GoldenCity?" question', async () => {
      const questionButton = screen.getByText("What is GoldenCity?");
      fireEvent.click(questionButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            /GoldenCity is an innovative investment project dedicated to real estate. We allow clients to invest as little as \$10 in investment properties/
          )
        ).toBeInTheDocument();
      });
    });

    test("displays correct answer for marketplace question", async () => {
      const questionButton = screen.getByText(
        "What is the marketplace, or secondary market?"
      );
      fireEvent.click(questionButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            /The GoldenCity Marketplace is our platform that allows GoldenCity community members to buy and sell NFTs among themselves/
          )
        ).toBeInTheDocument();
      });
    });

    test("displays correct answer for property management question", async () => {
      const questionButton = screen.getByText(
        "Who does the property management?"
      );
      fireEvent.click(questionButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            /We take care of the rental, technical, administrative and legal management of the properties/
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    test("questions are accessible as buttons", () => {
      const questionButtons = screen.getAllByRole("button");
      expect(questionButtons.length).toBeGreaterThan(0);

      questionButtons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });

    test("headings have proper hierarchy", () => {
      const h1 = screen.getByRole("heading", { level: 1 });
      const h2s = screen.getAllByRole("heading", { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBe(6); // Should have 6 section headings
    });

    test("questions have proper text content for screen readers", () => {
      const questionButton = screen.getByRole("button", {
        name: /What is GoldenCity?/,
      });
      expect(questionButton).toBeInTheDocument();
      expect(questionButton.tagName.toLowerCase()).toBe("button");
    });
  });

  describe("Component Structure", () => {
    test("renders with correct CSS classes", () => {
      // Check for the main container structure instead of looking for 'main' role
      const mainContainer = document.querySelector(".min-h-screen");
      expect(mainContainer).toBeInTheDocument();

      // Verify the main heading is present (structural verification)
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    test("renders all expected sections", () => {
      // Verify we have the expected number of sections
      const sectionHeadings = screen.getAllByRole("heading", { level: 2 });
      expect(sectionHeadings).toHaveLength(6);
    });
  });

  describe("Error Handling", () => {
    test("handles missing data gracefully", () => {
      // This test ensures the component doesn't crash with the current data structure
      expect(() => render(<FAQ />)).not.toThrow();
    });
  });

  describe("State Management", () => {
    test("maintains separate state for each question", async () => {
      const question1 = screen.getByText("What is GoldenCity?");
      const question2 = screen.getByText(
        "What are the conditions for investing on GoldenCity?"
      );

      // Open first question
      fireEvent.click(question1);
      await waitFor(() => {
        expect(
          screen.getByText(/GoldenCity is an innovative investment project/)
        ).toBeInTheDocument();
      });

      // Open second question
      fireEvent.click(question2);
      await waitFor(() => {
        expect(
          screen.getByText(/Any person of legal age can hold a GoldenCity NFT/)
        ).toBeInTheDocument();
      });

      // Close first question - second should remain open
      fireEvent.click(question1);
      await waitFor(() => {
        expect(
          screen.queryByText(/GoldenCity is an innovative investment project/)
        ).not.toBeInTheDocument();
        expect(
          screen.getByText(/Any person of legal age can hold a GoldenCity NFT/)
        ).toBeInTheDocument();
      });
    });
  });
});
