import Footer from "../../../components/layout/Footer.jsx";
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// 1.Icon Tests: Ensures all icons are rendered (with mocked components)
// Mock the react-icons
jest.mock("react-icons/fi", () => ({
  FiPhone: () => <div data-testid="phone-icon">Phone Icon</div>,
  FiMail: () => <div data-testid="mail-icon">Mail Icon</div>,
  FiMapPin: () => <div data-testid="map-pin-icon">MapPin Icon</div>,
  FiGithub: () => <div data-testid="github-icon">Github Icon</div>,
  FiTwitter: () => <div data-testid="twitter-icon">Twitter Icon</div>,
  FiLinkedin: () => <div data-testid="linkedin-icon">LinkedIn Icon</div>,
}));

jest.mock("react-icons/fa", () => ({
  FaDiscord: () => <div data-testid="discord-icon">Discord Icon</div>,
}));

// 2.Rendering Tests: Ensures the component renders without errors
// Wrapper component for React Router

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ to, children, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Footer Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders footer element", () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  test("has correct CSS classes for styling", () => {
    renderWithRouter(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-secondary-900", "text-white");
  });

  describe("Company Info Section", () => {
    test("displays company name", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("GoldenCity")).toBeInTheDocument();
    });

    test("displays company description", () => {
      renderWithRouter(<Footer />);
      const description = screen.getByText(
        /Your trusted partner in finding the perfect property/
      );
      expect(description).toBeInTheDocument();
    });
  });

  // 3.Navigation Tests: Checks that all links have correct href attributes
  describe("Quick Links Section", () => {
    test("displays quick links heading", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Quick Links")).toBeInTheDocument();
    });

    test("renders all navigation links with correct paths", () => {
      renderWithRouter(<Footer />);

      const propertiesLink = screen.getByRole("link", { name: "Properties" });
      expect(propertiesLink).toBeInTheDocument();
      expect(propertiesLink).toHaveAttribute("href", "/properties");

      const aboutLink = screen.getByRole("link", { name: "About Us" });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute("href", "/about");

      const faqLink = screen.getByRole("link", { name: "FAQ" });
      expect(faqLink).toBeInTheDocument();
      expect(faqLink).toHaveAttribute("href", "/faq");

      const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
      expect(privacyLink).toBeInTheDocument();
      expect(privacyLink).toHaveAttribute("href", "/privacy");
    });

    // 4.Styling Tests: Verifies CSS classes are applied correctly
    test("navigation links have correct CSS classes", () => {
      renderWithRouter(<Footer />);

      const propertiesLink = screen.getByRole("link", { name: "Properties" });
      expect(propertiesLink).toHaveClass(
        "text-secondary-300",
        "hover:text-white",
        "text-sm"
      );
    });
  });

  // 5.Content Tests: Verifies all text content is displayed correctly
  describe("Contact Info Section", () => {
    test("displays contact heading", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    test("displays phone number with icon", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByTestId("phone-icon")).toBeInTheDocument();
      expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
    });

    test("displays email with icon", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
      expect(screen.getByText("contact@GoldenCity.com")).toBeInTheDocument();
    });

    test("displays address with icon", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByTestId("map-pin-icon")).toBeInTheDocument();
      expect(
        screen.getByText("123 Property Street, Real City, RC 12345")
      ).toBeInTheDocument();
    });
  });

  describe("Social Links Section", () => {
    test("displays social links heading", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Connect With Us")).toBeInTheDocument();
    });

    test("renders all social media icons", () => {
      renderWithRouter(<Footer />);

      expect(screen.getByTestId("twitter-icon")).toBeInTheDocument();
      expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
      expect(screen.getByTestId("github-icon")).toBeInTheDocument();
      expect(screen.getByTestId("discord-icon")).toBeInTheDocument();
    });

    test("social links have correct href attributes", () => {
      renderWithRouter(<Footer />);

      const socialLinks = screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("href") === "#");

      expect(socialLinks).toHaveLength(4);
    });

    test("social links have correct CSS classes", () => {
      renderWithRouter(<Footer />);

      const socialLinks = screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("href") === "#");

      socialLinks.forEach((link) => {
        expect(link).toHaveClass("text-secondary-300", "hover:text-white");
      });
    });
  });

  // 7.Dynamic Content: Tests the current year calculation in copyright
  describe("Copyright Section", () => {
    test("displays current year in copyright", () => {
      renderWithRouter(<Footer />);
      const currentYear = new Date().getFullYear();
      const copyrightText = screen.getByText(
        `© ${currentYear} GoldenCity. All rights reserved.`
      );
      expect(copyrightText).toBeInTheDocument();
    });

    test("copyright section has correct styling", () => {
      renderWithRouter(<Footer />);
      const currentYear = new Date().getFullYear();
      const copyrightElement = screen.getByText(
        `© ${currentYear} GoldenCity. All rights reserved.`
      );

      expect(copyrightElement.closest("div")).toHaveClass(
        "border-t",
        "border-secondary-700",
        "mt-8",
        "pt-8",
        "text-center",
        "text-secondary-300",
        "text-sm"
      );
    });
  });

  describe("Layout and Structure", () => {
    test("has correct grid structure", () => {
      renderWithRouter(<Footer />);
      const gridContainer = screen
        .getByRole("contentinfo")
        .querySelector(".grid");
      expect(gridContainer).toHaveClass(
        "grid",
        "grid-cols-1",
        "md:grid-cols-4",
        "gap-8"
      );
    });

    test("container has correct padding", () => {
      renderWithRouter(<Footer />);
      const container = screen
        .getByRole("contentinfo")
        .querySelector(".container");
      expect(container).toHaveClass("py-12");
    });
  });

  // 6.Accessibility Tests: Checks semantic HTML and keyboard accessibility
  describe("Accessibility", () => {
    test("footer has proper semantic role", () => {
      renderWithRouter(<Footer />);
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
    });

    test("all links are keyboard accessible", () => {
      renderWithRouter(<Footer />);
      const links = screen.getAllByRole("link");

      links.forEach((link) => {
        expect(link).toBeVisible();
      });
    });

    test("headings have proper hierarchy", () => {
      renderWithRouter(<Footer />);

      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings).toHaveLength(4);

      const expectedHeadings = [
        "GoldenCity",
        "Quick Links",
        "Contact",
        "Connect With Us",
      ];
      expectedHeadings.forEach((heading) => {
        expect(
          screen.getByRole("heading", { name: heading, level: 3 })
        ).toBeInTheDocument();
      });
    });
  });

  // 8.Edge Cases: Handles various scenarios and error conditions
  describe("Edge Cases", () => {
    test("renders without crashing when no props are passed", () => {
      expect(() => {
        renderWithRouter(<Footer />);
      }).not.toThrow();
    });

    test("handles year calculation correctly", () => {
      // Mock Date to test year calculation
      const mockDate = new Date("2024-01-01");
      jest.spyOn(global, "Date").mockImplementation(() => mockDate);

      renderWithRouter(<Footer />);
      expect(
        screen.getByText("© 2024 GoldenCity. All rights reserved.")
      ).toBeInTheDocument();

      global.Date.mockRestore();
    });
  });
});
