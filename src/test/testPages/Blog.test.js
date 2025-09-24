import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Blog from "../../pages/Blog.jsx";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      viewport,
      transition,
      whileInView,
      ...props
    }) => <div {...props}>{children}</div>,
    article: ({
      children,
      initial,
      animate,
      viewport,
      transition,
      whileInView,
      ...props
    }) => <article {...props}>{children}</article>,
  },
}));

// Mock react-icons
jest.mock("react-icons/fi", () => ({
  FiSearch: () => <div data-testid="search-icon" />,
  FiClock: () => <div data-testid="clock-icon" />,
  FiUser: () => <div data-testid="user-icon" />,
}));

// Wrapper component with Router
const BlogWrapper = () => (
  <BrowserRouter>
    <Blog />
  </BrowserRouter>
);

describe("Blog Component", () => {
  beforeEach(() => {
    // Clear any previous renders
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders blog header correctly", () => {
      render(<BlogWrapper />);

      expect(
        screen.getByText("Real Estate & Crypto Insights")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Stay updated with the latest trends/)
      ).toBeInTheDocument();
    });

    test("renders search input", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      expect(searchInput).toBeInTheDocument();
      expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    });

    test("renders category filter dropdown", () => {
      render(<BlogWrapper />);

      const categorySelect = screen.getByDisplayValue("All Posts");
      expect(categorySelect).toBeInTheDocument();

      // Check if all categories are present in the select dropdown
      expect(
        screen.getByRole("option", { name: "All Posts" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Cryptocurrency" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Investment" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Property" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Technology" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: "Market Analysis" })
      ).toBeInTheDocument();
    });

    test("renders all blog posts initially", () => {
      render(<BlogWrapper />);

      // Check if all 6 posts are rendered
      expect(
        screen.getByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("Understanding Tokenized Real Estate Investment")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Smart Contracts in Real Estate Transactions")
      ).toBeInTheDocument();
      expect(
        screen.getByText("2024 Real Estate Market Analysis: Crypto Impact")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Property Investment Strategies with Cryptocurrency")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Regulatory Landscape: Crypto in Real Estate")
      ).toBeInTheDocument();
    });

    test("renders blog post metadata", () => {
      render(<BlogWrapper />);

      // Check for authors
      expect(screen.getAllByText("Sarah Johnson")).toHaveLength(2);
      expect(screen.getAllByText("Michael Chen")).toHaveLength(2);

      // Check for read times - using getAllByText for duplicate values
      expect(screen.getAllByText("5 min read")).toHaveLength(1);
      expect(screen.getAllByText("7 min read")).toHaveLength(2);
      expect(screen.getAllByText("6 min read")).toHaveLength(2);
      expect(screen.getAllByText("8 min read")).toHaveLength(1);

      // Check for icons
      expect(screen.getAllByTestId("user-icon")).toHaveLength(6);
      expect(screen.getAllByTestId("clock-icon")).toHaveLength(6);
    });
  });

  describe("Search Functionality", () => {
    test("filters posts based on search term in title", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      fireEvent.change(searchInput, { target: { value: "Smart Contracts" } });

      expect(
        screen.getByText("Smart Contracts in Real Estate Transactions")
      ).toBeInTheDocument();
      expect(
        screen.queryByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
      ).not.toBeInTheDocument();
    });

    test("filters posts based on search term in excerpt", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      fireEvent.change(searchInput, { target: { value: "tokenization" } });

      expect(
        screen.getByText("Understanding Tokenized Real Estate Investment")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Smart Contracts in Real Estate Transactions")
      ).not.toBeInTheDocument();
    });

    test("search is case insensitive", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      fireEvent.change(searchInput, { target: { value: "CRYPTO" } });

      // Should find multiple posts with "crypto" in title or excerpt
      expect(
        screen.getByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("2024 Real Estate Market Analysis: Crypto Impact")
      ).toBeInTheDocument();
    });

    test("shows no results when search term matches nothing", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      fireEvent.change(searchInput, { target: { value: "nonexistent term" } });

      // Should not show any posts
      expect(
        screen.queryByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
      ).not.toBeInTheDocument();
    });

    test("clears search results when search term is cleared", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");

      // Search for something
      fireEvent.change(searchInput, { target: { value: "Smart Contracts" } });
      expect(
        screen.getByText("Smart Contracts in Real Estate Transactions")
      ).toBeInTheDocument();

      // Clear search
      fireEvent.change(searchInput, { target: { value: "" } });
      expect(
        screen.getByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Category Filtering", () => {
    test("filters posts by cryptocurrency category", () => {
      render(<BlogWrapper />);

      const categorySelect = screen.getByDisplayValue("All Posts");
      fireEvent.change(categorySelect, { target: { value: "crypto" } });

      expect(
        screen.getByText(
          "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("Regulatory Landscape: Crypto in Real Estate")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Understanding Tokenized Real Estate Investment")
      ).not.toBeInTheDocument();
    });

    test("filters posts by investment category", () => {
      render(<BlogWrapper />);

      const categorySelect = screen.getByDisplayValue("All Posts");
      fireEvent.change(categorySelect, { target: { value: "investment" } });

      expect(
        screen.getByText("Understanding Tokenized Real Estate Investment")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Property Investment Strategies with Cryptocurrency")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Smart Contracts in Real Estate Transactions")
      ).not.toBeInTheDocument();
    });

    test("filters posts by technology category", () => {
      render(<BlogWrapper />);

      const categorySelect = screen.getByDisplayValue("All Posts");
      fireEvent.change(categorySelect, { target: { value: "technology" } });

      expect(
        screen.getByText("Smart Contracts in Real Estate Transactions")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Understanding Tokenized Real Estate Investment")
      ).not.toBeInTheDocument();
    });

    test('shows all posts when "all" category is selected', () => {
      render(<BlogWrapper />);

      const categorySelect = screen.getByDisplayValue("All Posts");

      // First filter to a specific category
      fireEvent.change(categorySelect, { target: { value: "crypto" } });
      expect(
        screen.queryByText("Understanding Tokenized Real Estate Investment")
      ).not.toBeInTheDocument();

      // Then back to all
      fireEvent.change(categorySelect, { target: { value: "all" } });
      expect(
        screen.getByText("Understanding Tokenized Real Estate Investment")
      ).toBeInTheDocument();
    });
  });

  describe("Combined Search and Filter", () => {
    test("applies both search and category filter simultaneously", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      const categorySelect = screen.getByDisplayValue("All Posts");

      // Filter by investment category and search for "crypto"
      fireEvent.change(categorySelect, { target: { value: "investment" } });
      fireEvent.change(searchInput, { target: { value: "crypto" } });

      expect(
        screen.getByText("Property Investment Strategies with Cryptocurrency")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Understanding Tokenized Real Estate Investment")
      ).not.toBeInTheDocument();
    });

    test("shows no results when search and filter combination matches nothing", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      const categorySelect = screen.getByDisplayValue("All Posts");

      // Filter by technology category and search for "investment"
      fireEvent.change(categorySelect, { target: { value: "technology" } });
      fireEvent.change(searchInput, {
        target: { value: "investment strategies" },
      });

      // Should show no results
      expect(
        screen.queryByText("Smart Contracts in Real Estate Transactions")
      ).not.toBeInTheDocument();
    });
  });

  describe("Blog Post Links", () => {
    test("blog post titles are wrapped in links with correct hrefs", () => {
      render(<BlogWrapper />);

      const firstPostLink = screen.getByRole("link", {
        name: /The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology/,
      });
      expect(firstPostLink).toHaveAttribute(
        "href",
        "/blog/future-real-estate-crypto-payments"
      );

      const secondPostLink = screen.getByRole("link", {
        name: /Understanding Tokenized Real Estate Investment/,
      });
      expect(secondPostLink).toHaveAttribute(
        "href",
        "/blog/understanding-tokenized-real-estate"
      );
    });

    test("all blog posts have clickable links", () => {
      render(<BlogWrapper />);

      const links = screen.getAllByRole("link");
      // Should have 6 links (one for each blog post)
      expect(links).toHaveLength(6);
    });
  });

  describe("Blog Post Images", () => {
    test("renders images with correct alt text", () => {
      render(<BlogWrapper />);

      const firstPostImage = screen.getByAltText(
        "The Future of Real Estate: Cryptocurrency Payments and Blockchain Technology"
      );
      expect(firstPostImage).toBeInTheDocument();
      expect(firstPostImage).toHaveAttribute(
        "src",
        "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800&q=80"
      );
    });

    test("all blog posts have images", () => {
      render(<BlogWrapper />);

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(6);
    });
  });

  describe("Category Tags", () => {
    test("displays correct category tags on posts", () => {
      render(<BlogWrapper />);

      // Check category tags in the post cards (not in the dropdown)
      const categoryTags = screen.getAllByText("Cryptocurrency");
      const investmentTags = screen.getAllByText("Investment");
      const technologyTags = screen.getAllByText("Technology");
      const marketTags = screen.getAllByText("Market Analysis");

      // Verify we have the expected number of each category tag
      // (including both dropdown options and post tags)
      expect(categoryTags.length).toBeGreaterThan(1); // At least dropdown + post tags
      expect(investmentTags.length).toBeGreaterThan(1);
      expect(technologyTags.length).toBeGreaterThan(1);
      expect(marketTags.length).toBeGreaterThan(1);
    });
  });

  describe("Accessibility", () => {
    test("search input has proper accessibility attributes", () => {
      render(<BlogWrapper />);

      const searchInput = screen.getByPlaceholderText("Search articles...");
      expect(searchInput).toHaveAttribute("type", "text");
    });

    test("category select has proper accessibility", () => {
      render(<BlogWrapper />);

      const categorySelect = screen.getByDisplayValue("All Posts");
      expect(categorySelect).toBeInTheDocument();
    });

    test("blog posts use proper semantic HTML", () => {
      render(<BlogWrapper />);

      const articles = screen.getAllByRole("article");
      expect(articles).toHaveLength(6);
    });
  });
});
