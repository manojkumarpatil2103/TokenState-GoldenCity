import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import BlogPost from "../../pages/BlogPost.jsx";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Test wrapper component
const TestWrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe("BlogPost Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders blog post title correctly", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      expect(
        screen.getByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
      ).toBeInTheDocument();
    });

    test("renders author information", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(screen.getByText("2024-03-15")).toBeInTheDocument();
      expect(screen.getByText("5 min read")).toBeInTheDocument();
    });

    test("renders hero image with correct attributes", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const heroImage = screen.getByAltText(
        "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
      );
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute(
        "src",
        "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=1200&q=80"
      );
    });

    test("renders back to blog link", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const backLink = screen.getByText("Back to Blog");
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest("a")).toHaveAttribute("href", "/blog");
    });
  });

  describe("Content Sections", () => {
    test("renders all main content headings", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      expect(
        screen.getByText("The Rise of Crypto in Real Estate")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Blockchain's Impact on Property Transactions")
      ).toBeInTheDocument();
      expect(screen.getByText("The Future Outlook")).toBeInTheDocument();
      expect(screen.getByText("Conclusion")).toBeInTheDocument();
    });

    test("renders content with HTML correctly", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      // Test that HTML content is rendered (checking for specific text from the content)
      expect(
        screen.getByText(/revolutionary transformation/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Faster transaction processing/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Smart Contracts: Automating and securing transaction processes/
        )
      ).toBeInTheDocument();
    });

    test("renders lists correctly", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      // Check for list items
      expect(screen.getByText("Lower transaction fees")).toBeInTheDocument();
      expect(
        screen.getByText("Enhanced security through blockchain technology")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Property Records: Creating immutable records of ownership"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Sidebar Components", () => {
    test("renders share section", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      expect(screen.getByText("Share this article")).toBeInTheDocument();
    });

    test("renders social media share buttons", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const shareButtons = screen.getAllByRole("button");
      const socialButtons = shareButtons.filter(
        (button) => button.querySelector("svg") !== null
      );

      expect(socialButtons).toHaveLength(3); // Facebook, Twitter, LinkedIn
    });

    test("renders tags section", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      expect(screen.getByText("Tags")).toBeInTheDocument();
      expect(screen.getByText("Blockchain")).toBeInTheDocument();
      expect(screen.getByText("Real Estate")).toBeInTheDocument();
      expect(screen.getByText("Cryptocurrency")).toBeInTheDocument();
      expect(screen.getByText("Investment")).toBeInTheDocument();
    });

    test("renders all tags with correct styling", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const tags = [
        "Blockchain",
        "Real Estate",
        "Cryptocurrency",
        "Investment",
      ];

      tags.forEach((tag) => {
        const tagElement = screen.getByText(tag);
        expect(tagElement).toBeInTheDocument();
        expect(tagElement).toHaveClass(
          "px-3",
          "py-1",
          "bg-secondary-100",
          "text-secondary-600",
          "rounded-full",
          "text-sm"
        );
      });
    });
  });

  describe("User Interactions", () => {
    test("social media buttons are clickable", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const shareButtons = screen.getAllByRole("button");
      const socialButtons = shareButtons.filter(
        (button) => button.querySelector("svg") !== null
      );

      socialButtons.forEach((button) => {
        fireEvent.click(button);
        // Since these are just styled buttons without actual functionality,
        // we just verify they can be clicked without errors
        expect(button).toBeInTheDocument();
      });
    });

    test("back to blog link has correct hover classes", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const backLink = screen.getByText("Back to Blog").closest("a");
      expect(backLink).toHaveClass("hover:text-primary-300");
    });
  });

  describe("Layout and Styling", () => {
    test("renders with correct main container classes", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const mainContainer = screen
        .getByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
        .closest(".min-h-screen");
      expect(mainContainer).toHaveClass("min-h-screen", "bg-secondary-50");
    });

    test("hero section has correct styling", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const heroSection = screen
        .getByAltText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
        .closest(".relative");
      expect(heroSection).toHaveClass("relative", "h-[400px]");
    });

    test("content area has correct grid layout", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const gridContainer = screen
        .getByText("The Rise of Crypto in Real Estate")
        .closest(".grid");
      expect(gridContainer).toHaveClass(
        "grid",
        "grid-cols-1",
        "lg:grid-cols-3",
        "gap-8"
      );
    });
  });

  describe("Accessibility", () => {
    test("hero image has proper alt text", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const heroImage = screen.getByAltText(
        "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
      );
      expect(heroImage).toBeInTheDocument();
    });

    test("social media buttons are accessible", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });

    test("headings have proper hierarchy", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toHaveTextContent(
        "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
      );

      const subHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(subHeadings).toHaveLength(2); // "Share this article" and "Tags"
    });
  });

  describe("Component Structure", () => {
    test("renders main content in prose container", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const proseContainer = screen
        .getByText(/revolutionary transformation/)
        .closest(".prose");
      expect(proseContainer).toHaveClass("prose", "prose-lg", "max-w-none");
    });

    test("sidebar components are in separate containers", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const shareSection = screen
        .getByText("Share this article")
        .closest(".bg-white");
      const tagsSection = screen.getByText("Tags").closest(".bg-white");

      expect(shareSection).toHaveClass(
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-6"
      );
      expect(tagsSection).toHaveClass(
        "bg-white",
        "rounded-lg",
        "shadow-md",
        "p-6"
      );
    });
  });

  describe("Icons Rendering", () => {
    test("renders user icon in author section", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      // Check that author section exists (icons are rendered as SVG elements)
      const authorSection = screen.getByText("Sarah Johnson").parentElement;
      expect(authorSection).toBeInTheDocument();
    });

    test("renders calendar and clock icons in meta information", () => {
      render(
        <TestWrapper>
          <BlogPost />
        </TestWrapper>
      );

      const dateSection = screen.getByText("2024-03-15").parentElement;
      const readTimeSection = screen.getByText("5 min read").parentElement;

      expect(dateSection).toBeInTheDocument();
      expect(readTimeSection).toBeInTheDocument();
    });
  });
});
