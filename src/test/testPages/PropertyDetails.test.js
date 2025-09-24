import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import PropertyDetail from "../../pages/PropertyDetail.jsx";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock react-share
jest.mock("react-share", () => ({
  FacebookShareButton: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  ),
  TwitterShareButton: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  ),
  LinkedinShareButton: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock react-icons
jest.mock("react-icons/fi", () => ({
  FiHome: () => <span data-testid="fi-home">Home Icon</span>,
  FiMaximize2: () => <span data-testid="fi-maximize">Maximize Icon</span>,
  FiCalendar: () => <span data-testid="fi-calendar">Calendar Icon</span>,
  FiTrendingUp: () => <span data-testid="fi-trending">Trending Icon</span>,
  FiUsers: () => <span data-testid="fi-users">Users Icon</span>,
  FiDollarSign: () => <span data-testid="fi-dollar">Dollar Icon</span>,
  FiGrid: () => <span data-testid="fi-grid">Grid Icon</span>,
}));

jest.mock("react-icons/fa", () => ({
  FaFacebook: () => <span data-testid="fa-facebook">Facebook Icon</span>,
  FaTwitter: () => <span data-testid="fa-twitter">Twitter Icon</span>,
  FaLinkedin: () => <span data-testid="fa-linkedin">LinkedIn Icon</span>,
  FaEthereum: () => <span data-testid="fa-ethereum">Ethereum Icon</span>,
  FaWallet: () => <span data-testid="fa-wallet">Wallet Icon</span>,
}));

// Helper function to render component with router
const renderWithRouter = (initialEntries = ["/property/1"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <PropertyDetail />
    </MemoryRouter>
  );
};

describe("PropertyDetail Component", () => {
  beforeEach(() => {
    // Mock window.location.href
    delete window.location;
    window.location = { href: "http://localhost/property/1" };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Component Rendering", () => {
    test("renders PropertyDetail component without crashing", () => {
      renderWithRouter();
      expect(screen.getByText("Modern Villa with Pool")).toBeInTheDocument();
    });

    test("displays correct property title", () => {
      renderWithRouter();
      expect(screen.getByText("Modern Villa with Pool")).toBeInTheDocument();
      // Note: Location is stored in property object but not displayed in the UI
    });

    test("renders navigation breadcrumb correctly", () => {
      renderWithRouter();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Properties")).toBeInTheDocument();
      expect(screen.getByText("Modern Villa with Pool")).toBeInTheDocument();
    });

    test("displays property images", () => {
      renderWithRouter();
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
      expect(images[0]).toHaveAttribute("alt", "Modern Villa with Pool");
    });
  });

  describe("Property Information Display", () => {
    test("displays property price in USD and ETH", () => {
      renderWithRouter();
      expect(screen.getByText("$850,000")).toBeInTheDocument();
      expect(screen.getByText("425 ETH")).toBeInTheDocument();
    });

    test("displays ROI information", () => {
      renderWithRouter();
      expect(screen.getByText("7.2%")).toBeInTheDocument();
      expect(screen.getByText("Annual ROI")).toBeInTheDocument();
    });

    test("shows property metrics", () => {
      renderWithRouter();
      expect(screen.getByText("142 Investors")).toBeInTheDocument();
      expect(screen.getByText("89%")).toBeInTheDocument();
      expect(screen.getByText("Min Investment: $10")).toBeInTheDocument();
    });

    test("displays property features", () => {
      renderWithRouter();
      expect(screen.getByText("Swimming Pool")).toBeInTheDocument();
      expect(screen.getByText("Smart Home System")).toBeInTheDocument();
      expect(screen.getByText("Gourmet Kitchen")).toBeInTheDocument();
    });

    test("shows property details correctly", () => {
      renderWithRouter();
      expect(screen.getByText("3 Parking")).toBeInTheDocument();
      expect(screen.getByText("0.5 acres")).toBeInTheDocument();
      expect(screen.getByText("Built 2020")).toBeInTheDocument();
    });
  });

  describe("Token Information", () => {
    test("displays token details", () => {
      renderWithRouter();
      expect(screen.getByText("VILLA425")).toBeInTheDocument();
      expect(screen.getByText("$10")).toBeInTheDocument();
      expect(screen.getByText("9,350")).toBeInTheDocument();
      expect(screen.getByText("85,000")).toBeInTheDocument();
      expect(screen.getByText("0x1234...5678")).toBeInTheDocument();
    });

    test("shows token information section headers", () => {
      renderWithRouter();
      expect(screen.getByText("Token Information")).toBeInTheDocument();
      expect(screen.getByText("Token Symbol")).toBeInTheDocument();
      expect(screen.getByText("Token Price")).toBeInTheDocument();
      expect(screen.getByText("Available Tokens")).toBeInTheDocument();
      expect(screen.getByText("Total Supply")).toBeInTheDocument();
      expect(screen.getByText("Smart Contract")).toBeInTheDocument();
    });
  });

  describe("Financial Information", () => {
    test("displays financial overview", () => {
      renderWithRouter();
      expect(screen.getByText("Financial Overview")).toBeInTheDocument();
      expect(screen.getByText("$8,500/month")).toBeInTheDocument();
      expect(screen.getByText("$7,225/month")).toBeInTheDocument();
    });

    test("shows expense breakdown", () => {
      renderWithRouter();
      expect(screen.getByText("8%")).toBeInTheDocument(); // management
      expect(screen.getByText("5%")).toBeInTheDocument(); // maintenance
      expect(screen.getByText("2%")).toBeInTheDocument(); // insurance
      expect(screen.getByText("1.2%")).toBeInTheDocument(); // property tax
    });

    test("displays investment metrics", () => {
      renderWithRouter();
      expect(screen.getByText("5.8%")).toBeInTheDocument(); // rental yield
      expect(screen.getByText("4.5%")).toBeInTheDocument(); // appreciation
      expect(screen.getByText("10.3%")).toBeInTheDocument(); // total return
    });
  });

  describe("Agent Information", () => {
    test("displays agent details", () => {
      renderWithRouter();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Investment Advisor")).toBeInTheDocument();
      expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
      expect(screen.getByText("john@realestate.com")).toBeInTheDocument();
    });

    test("shows agent profile image", () => {
      renderWithRouter();
      const agentImage = screen.getByAltText("John Doe");
      expect(agentImage).toBeInTheDocument();
      expect(agentImage).toHaveAttribute(
        "src",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
      );
    });
  });

  describe("Interactive Elements", () => {
    test("renders wallet connection button", () => {
      renderWithRouter();
      const walletButton = screen.getByRole("button", {
        name: /connect wallet to invest/i,
      });
      expect(walletButton).toBeInTheDocument();
    });

    test("renders 3D view button with correct link", () => {
      renderWithRouter();
      const threeDButton = screen.getByRole("link", {
        name: /view 3d version/i,
      });
      expect(threeDButton).toBeInTheDocument();
      expect(threeDButton).toHaveAttribute("href", "/property-3d");
    });

    test("renders schedule consultation button", () => {
      renderWithRouter();
      const consultationButton = screen.getByRole("button", {
        name: /schedule consultation/i,
      });
      expect(consultationButton).toBeInTheDocument();
    });

    test("renders social share buttons", () => {
      renderWithRouter();
      expect(screen.getByTestId("fa-facebook")).toBeInTheDocument();
      expect(screen.getByTestId("fa-twitter")).toBeInTheDocument();
      expect(screen.getByTestId("fa-linkedin")).toBeInTheDocument();
    });
  });

  describe("Progress Bar", () => {
    test("displays funding progress bar with correct width", () => {
      renderWithRouter();
      const progressBar = document.querySelector(
        ".bg-primary-600.h-2.rounded-full"
      );
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle({ width: "89%" });
    });

    test("shows funding progress text", () => {
      renderWithRouter();
      expect(screen.getByText("Funding Progress")).toBeInTheDocument();
      expect(screen.getByText("89%")).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    test("navigation links have correct href attributes", () => {
      renderWithRouter();
      const homeLink = screen.getByRole("link", { name: "Home" });
      const propertiesLink = screen.getByRole("link", { name: "Properties" });

      expect(homeLink).toHaveAttribute("href", "/");
      expect(propertiesLink).toHaveAttribute("href", "/properties");
    });
  });

  describe("Responsive Design Elements", () => {
    test("applies correct CSS classes for responsive layout", () => {
      renderWithRouter();
      const gridContainer = document.querySelector(
        ".grid.grid-cols-1.lg\\:grid-cols-3.gap-8"
      );
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass(
        "grid",
        "grid-cols-1",
        "lg:grid-cols-3",
        "gap-8"
      );
    });
  });

  describe("Error Handling", () => {
    test("handles missing property ID gracefully", () => {
      render(
        <MemoryRouter initialEntries={["/property/"]}>
          <PropertyDetail />
        </MemoryRouter>
      );
      // Component should still render with default data
      expect(screen.getByText("Modern Villa with Pool")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    test("images have proper alt text", () => {
      renderWithRouter();
      const mainImage = screen.getByAltText("Modern Villa with Pool");
      expect(mainImage).toBeInTheDocument();
    });

    test("buttons have accessible names", () => {
      renderWithRouter();
      expect(
        screen.getByRole("button", { name: /connect wallet to invest/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /schedule consultation/i })
      ).toBeInTheDocument();
    });

    test("links have accessible text", () => {
      renderWithRouter();
      expect(
        screen.getByRole("link", { name: /view 3d version/i })
      ).toBeInTheDocument();
    });
  });

  describe("Data Formatting", () => {
    test("formats numbers correctly with commas", () => {
      renderWithRouter();
      expect(screen.getByText("$850,000")).toBeInTheDocument();
      expect(screen.getByText("85,000")).toBeInTheDocument();
      expect(screen.getByText("9,350")).toBeInTheDocument();
    });

    test("displays percentage values correctly", () => {
      renderWithRouter();
      expect(screen.getByText("7.2%")).toBeInTheDocument();
      expect(screen.getByText("89%")).toBeInTheDocument();
      expect(screen.getByText("5.8%")).toBeInTheDocument();
    });
  });
});
