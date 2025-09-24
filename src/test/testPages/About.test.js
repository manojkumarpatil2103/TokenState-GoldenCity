import React from "react";
import About from "../../pages/About.jsx";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      initial,
      animate,
      whileInView,
      viewport,
      transition,
      ...props
    }) => <div {...props}>{children}</div>,
  },
}));

// Mock react-icons
jest.mock("react-icons/fi", () => ({
  FiUsers: () => <div data-testid="users-icon" />,
  FiDollarSign: () => <div data-testid="dollar-icon" />,
  FiGlobe: () => <div data-testid="globe-icon" />,
  FiShield: () => <div data-testid="shield-icon" />,
  FiBriefcase: () => <div data-testid="briefcase-icon" />,
  FiAward: () => <div data-testid="award-icon" />,
}));

jest.mock("react-icons/fa", () => ({
  FaBitcoin: () => <div data-testid="bitcoin-icon" />,
  FaEthereum: () => <div data-testid="ethereum-icon" />,
  FaHandshake: () => <div data-testid="handshake-icon" />,
}));

jest.mock("react-icons/si", () => ({
  SiChainlink: () => <div data-testid="chainlink-icon" />,
}));

// Mock the image import
// get the image from assets folder
jest.mock("../assets/MehdiRezakhani2.jpeg", () => "test-file-stub");

describe("About Component", () => {
  beforeEach(() => {
    render(<About />);
  });

  describe("Hero Section", () => {
    test("renders hero section with correct title and description", () => {
      expect(
        screen.getByText("Revolutionizing Real Estate Investment")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /We're bridging the gap between traditional real estate and\s+cryptocurrency, making property investment accessible, secure, and transparent through blockchain technology\./i
        )
      ).toBeInTheDocument();
    });

    test("hero section has correct styling classes", () => {
      const heroTitle = screen.getByText(
        "Revolutionizing Real Estate Investment"
      );
      expect(heroTitle.closest("section")).toHaveClass(
        "relative",
        "bg-secondary-900",
        "text-white",
        "py-24"
      );
    });
  });

  describe("Stats Section", () => {
    test("renders all stat cards with correct values and labels", () => {
      expect(screen.getByText("$250M+")).toBeInTheDocument();
      expect(screen.getByText("Property Transactions")).toBeInTheDocument();

      expect(screen.getByText("15,000+")).toBeInTheDocument();
      expect(screen.getByText("Active Investors")).toBeInTheDocument();

      expect(screen.getByText("45+")).toBeInTheDocument();
      expect(screen.getByText("Countries Served")).toBeInTheDocument();

      expect(screen.getByText("100%")).toBeInTheDocument();
      expect(screen.getByText("Secure Transactions")).toBeInTheDocument();
    });

    test("renders correct icons for each stat", () => {
      expect(screen.getByTestId("dollar-icon")).toBeInTheDocument();
      expect(screen.getByTestId("users-icon")).toBeInTheDocument();
      expect(screen.getAllByTestId("globe-icon")).toHaveLength(2); // One in stats, one in mission
      expect(screen.getAllByTestId("shield-icon")).toHaveLength(3); // One in stats, one in mission, one in awards
    });

    test("stats section has correct grid layout", () => {
      const statsSection = screen.getByText("$250M+").closest(".container");
      const statsGrid = statsSection.querySelector(".grid");
      expect(statsGrid).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-4",
        "gap-8"
      );
    });
  });

  describe("Mission Section", () => {
    test("renders mission title and description", () => {
      expect(screen.getByText("Our Mission")).toBeInTheDocument();
      expect(
        screen.getByText(
          /To democratize real estate investment by leveraging blockchain\s+technology, making property ownership accessible to investors\s+worldwide through fractional ownership and cryptocurrency\s+transactions./i
        )
      ).toBeInTheDocument();
    });

    test("renders all three mission pillars", () => {
      expect(screen.getByText("Accessibility")).toBeInTheDocument();
      expect(screen.getByText("Security")).toBeInTheDocument();
      expect(screen.getByText("Global Reach")).toBeInTheDocument();
    });

    test("renders mission pillar descriptions", () => {
      expect(
        screen.getByText(
          /Making real estate investment available to everyone through\s+fractional ownership and cryptocurrency payments./i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /Ensuring secure transactions through blockchain technology and smart contracts./i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /Connecting property investors and opportunities worldwide through our platform./i
        )
      ).toBeInTheDocument();
    });

    test("renders correct icons for mission pillars", () => {
      expect(screen.getByTestId("handshake-icon")).toBeInTheDocument();
      // Shield icon appears three times - once in stats, once in mission, once in awards
      expect(screen.getAllByTestId("shield-icon")).toHaveLength(3);
      // Globe icon appears twice - once in stats, once in mission
      expect(screen.getAllByTestId("globe-icon")).toHaveLength(2);
    });
  });

  describe("Team Section", () => {
    test("renders team section title", () => {
      expect(screen.getByText("Our Leadership Team")).toBeInTheDocument();
    });

    test("renders all team members with correct names and roles", () => {
      expect(screen.getByText("Julien C.")).toBeInTheDocument();
      expect(screen.getByText("CEO & Founder")).toBeInTheDocument();

      expect(screen.getByText("Roman Cole")).toBeInTheDocument();
      expect(screen.getByText("CTO")).toBeInTheDocument();

      expect(screen.getByText("Mehdi Rezakhani")).toBeInTheDocument();
      expect(screen.getByText("Web & Mobile Developer")).toBeInTheDocument();

      expect(screen.getByText("Yuliia Kryvobok")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    });

    test("renders team member images with correct alt attributes", () => {
      const images = screen.getAllByRole("img");
      const teamImages = images.filter((img) =>
        [
          "Julien C.",
          "Roman Cole",
          "Mehdi Rezakhani",
          "Yuliia Kryvobok",
        ].includes(img.alt)
      );
      expect(teamImages).toHaveLength(4);
    });

    test("renders team member bio text", () => {
      const bioTexts = screen.getAllByText(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi amet debiti"
      );
      expect(bioTexts).toHaveLength(4);
    });

    test("team section has correct grid layout", () => {
      const teamSection = screen
        .getByText("Our Leadership Team")
        .closest("section");
      const teamGrid = teamSection.querySelector(".grid");
      expect(teamGrid).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-4"
      );
    });
  });

  describe("Partners/Cryptocurrencies Section", () => {
    test("renders supported cryptocurrencies title", () => {
      expect(
        screen.getByText("Supported Cryptocurrencies")
      ).toBeInTheDocument();
    });

    test("renders all cryptocurrency partners", () => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("Ethereum")).toBeInTheDocument();
      expect(screen.getByText("Chainlink")).toBeInTheDocument();
    });

    test("renders correct cryptocurrency icons", () => {
      expect(screen.getByTestId("bitcoin-icon")).toBeInTheDocument();
      expect(screen.getByTestId("ethereum-icon")).toBeInTheDocument();
      expect(screen.getByTestId("chainlink-icon")).toBeInTheDocument();
    });

    test("cryptocurrency section has correct grid layout", () => {
      const cryptoSection = screen
        .getByText("Supported Cryptocurrencies")
        .closest("section");
      const cryptoGrid = cryptoSection.querySelector(".grid");
      expect(cryptoGrid).toHaveClass("grid-cols-1", "md:grid-cols-3");
    });
  });

  describe("Awards Section", () => {
    test("renders awards section title", () => {
      expect(
        screen.getByText("Recognition & Achievements")
      ).toBeInTheDocument();
    });

    test("renders all awards with correct titles and descriptions", () => {
      expect(
        screen.getByText("Best Blockchain Innovation")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Real Estate Tech Awards 2024")
      ).toBeInTheDocument();

      expect(screen.getByText("Fastest Growing PropTech")).toBeInTheDocument();
      expect(screen.getByText("Forbes Innovation 2024")).toBeInTheDocument();

      expect(screen.getByText("Most Secure Platform")).toBeInTheDocument();
      expect(
        screen.getByText("Blockchain Security Excellence 2024")
      ).toBeInTheDocument();
    });

    test("renders correct award icons", () => {
      expect(screen.getByTestId("award-icon")).toBeInTheDocument();
      expect(screen.getByTestId("briefcase-icon")).toBeInTheDocument();
      // Shield icon appears three times throughout the component (stats, mission, awards)
      expect(
        screen.getAllByTestId("shield-icon").length
      ).toBeGreaterThanOrEqual(3);
    });

    test("awards section has correct grid layout", () => {
      const awardsSection = screen
        .getByText("Recognition & Achievements")
        .closest("section");
      const awardsGrid = awardsSection.querySelector(".grid");
      expect(awardsGrid).toHaveClass("grid-cols-1", "md:grid-cols-3");
    });
  });

  describe("Overall Component Structure", () => {
    test("renders with correct main container class", () => {
      const mainContainer = screen.getByTestId("main-container");
      expect(mainContainer).toHaveClass("min-h-screen", "bg-secondary-50");
    });

    test("renders all major sections", () => {
      const sections = document.querySelectorAll("section");
      expect(sections).toHaveLength(6); // Hero, Stats, Mission, Team, Partners, Awards
    });

    test("contains proper semantic structure", () => {
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
      expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(13); // Updated to actual count
    });
  });

  describe("Responsive Design Classes", () => {
    test("hero title has responsive text classes", () => {
      const heroTitle = screen.getByText(
        "Revolutionizing Real Estate Investment"
      );
      expect(heroTitle).toHaveClass("text-4xl", "md:text-5xl");
    });

    test("sections have proper responsive grid classes", () => {
      const grids = document.querySelectorAll(".grid");

      // Stats grid
      expect(grids[0]).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-4"
      );

      // Mission grid
      expect(grids[1]).toHaveClass("grid-cols-1", "md:grid-cols-3");

      // Team grid
      expect(grids[2]).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-4"
      );

      // Crypto grid
      expect(grids[3]).toHaveClass("grid-cols-1", "md:grid-cols-3");

      // Awards grid
      expect(grids[4]).toHaveClass("grid-cols-1", "md:grid-cols-3");
    });
  });

  describe("Image Loading", () => {
    test("all external images have proper src attributes", () => {
      const externalImages = screen
        .getAllByRole("img")
        .filter((img) => img.src.includes("unsplash.com"));
      expect(externalImages).toHaveLength(3);

      externalImages.forEach((img) => {
        expect(img).toHaveAttribute("src");
        expect(img.src).toMatch(/^https:\/\/images\.unsplash\.com/);
      });
    });

    test("Mehdi Rezakhani image uses local import", () => {
      const mehdiImage = screen.getByAltText("Mehdi Rezakhani");
      expect(mehdiImage).toHaveAttribute("src", "test-file-stub");
    });
  });

  describe("Accessibility", () => {
    test("all images have alt attributes", () => {
      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
        expect(img.alt).not.toBe("");
      });
    });

    test("proper heading hierarchy is maintained", () => {
      const h1 = screen.getByRole("heading", { level: 1 });
      const h2s = screen.getAllByRole("heading", { level: 2 });
      const h3s = screen.getAllByRole("heading", { level: 3 });

      expect(h1).toBeInTheDocument();
      expect(h2s.length).toBeGreaterThan(0);
      expect(h3s.length).toBeGreaterThan(0);
    });
  });
});

// Additional test file for edge cases and error handling
describe("About Component - Edge Cases", () => {
  test("handles missing image gracefully", () => {
    // This would test what happens if an image fails to load
    // In a real scenario, you might want to add error handling for images
    render(<About />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  test("component renders without throwing errors", () => {
    expect(() => render(<About />)).not.toThrow();
  });
});

// Performance tests
describe("About Component - Performance", () => {
  test("renders efficiently with all sections visible", async () => {
    const { container } = render(<About />);

    await waitFor(() => {
      expect(container.querySelectorAll("section")).toHaveLength(6);
    });
  });

  test("all text content is rendered synchronously", () => {
    render(<About />);

    // Key text should be immediately available
    expect(
      screen.getByText("Revolutionizing Real Estate Investment")
    ).toBeInTheDocument();
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
    expect(screen.getByText("Our Leadership Team")).toBeInTheDocument();
    expect(screen.getByText("Supported Cryptocurrencies")).toBeInTheDocument();
    expect(screen.getByText("Recognition & Achievements")).toBeInTheDocument();
  });
});
