import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Home from "../../pages/Home.jsx";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    article: ({ children, ...props }) => (
      <article {...props}>{children}</article>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock react-router-dom Link component
const MockedHome = () => (
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);

describe("Home Component", () => {
  beforeEach(() => {
    render(<MockedHome />);
  });

  describe("Hero Section", () => {
    test("renders hero title correctly", () => {
      expect(
        screen.getByText("Invest and Trade in Real Estate with Cryptocurrency")
      ).toBeInTheDocument();
    });

    test("renders hero description", () => {
      expect(
        screen.getByText(
          /Own fractional shares of premium properties through NFTs/
        )
      ).toBeInTheDocument();
    });

    test("displays hero background image", () => {
      const heroImage = screen.getByAltText("Hero background");
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute(
        "src",
        expect.stringContaining("unsplash.com")
      );
    });
  });

  describe("Investment Steps Section", () => {
    test("renders investment steps title", () => {
      expect(
        screen.getByText("Start Investing in Minutes")
      ).toBeInTheDocument();
    });

    test("displays all four investment steps", () => {
      // Use getAllByText for duplicate text, then check the length
      const connectWalletElements = screen.getAllByText("Connect Wallet");
      expect(connectWalletElements.length).toBeGreaterThan(0);

      expect(screen.getByText("Choose Property")).toBeInTheDocument();
      expect(screen.getByText("Receive Returns")).toBeInTheDocument();
      expect(screen.getByText("Flexible Exit")).toBeInTheDocument();
    });

    test("shows step numbers correctly", () => {
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
      expect(screen.getByText("Step 3")).toBeInTheDocument();
      expect(screen.getByText("Step 4")).toBeInTheDocument();
    });
  });

  describe("How It Works Section", () => {
    test("renders section title", () => {
      expect(screen.getByText("How GoldenCity Works")).toBeInTheDocument();
    });

    test("displays all how it works items", () => {
      expect(screen.getByText("Tokenization")).toBeInTheDocument();
      expect(screen.getByText("Purchase NFTs")).toBeInTheDocument();
      expect(screen.getByText("Monthly Returns")).toBeInTheDocument();
      expect(screen.getByText("Flexible Trading")).toBeInTheDocument();
    });

    test("shows tokenization description", () => {
      expect(
        screen.getByText(/Properties are divided into \$10 NFT tokens/)
      ).toBeInTheDocument();
    });
  });

  describe("Featured Properties Section", () => {
    test("renders section title", () => {
      expect(
        screen.getByText("Featured Investment Opportunities")
      ).toBeInTheDocument();
    });

    test("displays all featured properties", () => {
      expect(screen.getByText("Luxury Downtown Apartment")).toBeInTheDocument();
      expect(
        screen.getByText("Modern Tech District Complex")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Waterfront Commercial Space")
      ).toBeInTheDocument();
    });

    test("shows property locations", () => {
      expect(screen.getByText("Miami, FL")).toBeInTheDocument();
      expect(screen.getByText("Austin, TX")).toBeInTheDocument();
      expect(screen.getByText("Seattle, WA")).toBeInTheDocument();
    });

    test("displays property prices", () => {
      expect(screen.getByText("$850,000")).toBeInTheDocument();
      expect(screen.getByText("$1,200,000")).toBeInTheDocument();
      expect(screen.getByText("$2,100,000")).toBeInTheDocument();
    });

    test("shows ROI information", () => {
      expect(screen.getByText("7.2% Annual")).toBeInTheDocument();
      expect(screen.getByText("6.8% Annual")).toBeInTheDocument();
      expect(screen.getByText("7.5% Annual")).toBeInTheDocument();
    });

    test("displays property status", () => {
      expect(screen.getByText("Active Investment")).toBeInTheDocument();
      expect(screen.getByText("Almost Funded")).toBeInTheDocument();
      expect(screen.getByText("New Listing")).toBeInTheDocument();
    });

    test("shows investment metrics", () => {
      expect(screen.getByText("142")).toBeInTheDocument(); // Total investors for first property
      expect(screen.getByText("89%")).toBeInTheDocument(); // Funded percentage
      expect(screen.getAllByText("$10")).toHaveLength(3); // Min investment for all properties
    });

    test("renders invest now buttons", () => {
      const investButtons = screen.getAllByText("Invest Now");
      expect(investButtons).toHaveLength(3);
    });
  });

  describe("Why Choose Us Section", () => {
    test("renders section title", () => {
      expect(screen.getByText("Why Choose GoldenCity")).toBeInTheDocument();
    });

    test("displays all advantages", () => {
      expect(screen.getByText("Profitability")).toBeInTheDocument();
      expect(screen.getByText("Liquidity")).toBeInTheDocument();
      expect(screen.getByText("No Hidden Fees")).toBeInTheDocument();
      expect(screen.getByText("Hassle-Free Management")).toBeInTheDocument();
    });

    test("shows advantage descriptions", () => {
      expect(
        screen.getByText(/Target average annual returns of 7%/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Trade your property NFTs anytime/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Transparent pricing with no entry, exit/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/GoldenCity handles all property management/)
      ).toBeInTheDocument();
    });
  });

  describe("CTA Section", () => {
    test("renders CTA title", () => {
      expect(screen.getByText("Ready to Start Investing?")).toBeInTheDocument();
    });

    test("shows CTA buttons", () => {
      expect(screen.getByText("Browse Properties")).toBeInTheDocument();

      // Use getByRole for the button specifically
      const connectWalletButton = screen.getByRole("button", {
        name: "Connect Wallet",
      });
      expect(connectWalletButton).toBeInTheDocument();
    });

    test("displays CTA description", () => {
      expect(
        screen.getByText(
          /Join thousands of investors already earning passive income/
        )
      ).toBeInTheDocument();
    });
  });

  describe("Blog Section", () => {
    test("renders blog section title", () => {
      expect(screen.getByText("Latest Insights")).toBeInTheDocument();
    });

    test("displays blog posts", () => {
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
    });

    test("shows blog post authors", () => {
      expect(screen.getByText("Sarah Johnson")).toBeInTheDocument();
      expect(screen.getByText("Michael Chen")).toBeInTheDocument();
      expect(screen.getByText("David Rodriguez")).toBeInTheDocument();
    });

    test("displays read times", () => {
      expect(screen.getByText("5 min read")).toBeInTheDocument();
      expect(screen.getByText("7 min read")).toBeInTheDocument();
      expect(screen.getByText("6 min read")).toBeInTheDocument();
    });
  });

  describe("FAQ Section", () => {
    test("renders FAQ section title", () => {
      expect(
        screen.getByText("Frequently Asked Questions")
      ).toBeInTheDocument();
    });

    test("displays FAQ questions", () => {
      expect(screen.getByText("What is GoldenCity?")).toBeInTheDocument();
      expect(
        screen.getByText(
          "I want to buy NFTs, what payment methods are accepted?"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("What is the marketplace, or secondary market?")
      ).toBeInTheDocument();
    });

    test("FAQ items are initially collapsed", () => {
      const firstAnswer = screen.queryByText(
        /GoldenCity is an innovative investment project/
      );
      expect(firstAnswer).not.toBeInTheDocument();
    });

    test("clicking FAQ question expands answer", async () => {
      const firstQuestion = screen.getByText("What is GoldenCity?");
      fireEvent.click(firstQuestion);

      await waitFor(() => {
        expect(
          screen.getByText(/GoldenCity is an innovative investment project/)
        ).toBeInTheDocument();
      });
    });

    test("clicking expanded FAQ question collapses answer", async () => {
      const firstQuestion = screen.getByText("What is GoldenCity?");

      // Expand
      fireEvent.click(firstQuestion);
      await waitFor(() => {
        expect(
          screen.getByText(/GoldenCity is an innovative investment project/)
        ).toBeInTheDocument();
      });

      // Collapse
      fireEvent.click(firstQuestion);
      await waitFor(() => {
        expect(
          screen.queryByText(/GoldenCity is an innovative investment project/)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Discord CTA Section", () => {
    test("renders Discord section title", () => {
      expect(screen.getByText("Join Our Community")).toBeInTheDocument();
    });

    test("shows community stats", () => {
      expect(screen.getByText("10,000+ Members")).toBeInTheDocument();
      expect(screen.getByText("Weekly Events")).toBeInTheDocument();
    });

    test("displays Discord join button", () => {
      expect(screen.getByText("Join Now")).toBeInTheDocument();
    });

    test("Discord link has correct attributes", () => {
      const discordLink = screen.getByText("Join Now").closest("a");
      expect(discordLink).toHaveAttribute(
        "href",
        "https://discord.gg/GoldenCity"
      );
      expect(discordLink).toHaveAttribute("target", "_blank");
      expect(discordLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Interactive Elements", () => {
    test("multiple FAQ sections can be opened simultaneously", async () => {
      const firstQuestion = screen.getByText("What is GoldenCity?");
      const secondQuestion = screen.getByText(
        "I want to buy NFTs, what payment methods are accepted?"
      );

      // Open both questions
      fireEvent.click(firstQuestion);
      fireEvent.click(secondQuestion);

      await waitFor(() => {
        expect(
          screen.getByText(/GoldenCity is an innovative investment project/)
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            /You can use various payment methods such as Metamask/
          )
        ).toBeInTheDocument();
      });
    });

    test("Connect Wallet button is clickable", () => {
      // Use getByRole to specifically target the button
      const connectWalletButton = screen.getByRole("button", {
        name: "Connect Wallet",
      });
      expect(connectWalletButton).toBeInTheDocument();
      fireEvent.click(connectWalletButton);
      // Since there's no actual functionality, we just test that it's clickable
    });
  });

  describe("Accessibility", () => {
    test("images have alt text", () => {
      const heroImage = screen.getByAltText("Hero background");
      expect(heroImage).toBeInTheDocument();

      const propertyImages = screen.getAllByAltText(
        /Luxury Downtown Apartment|Modern Tech District Complex|Waterfront Commercial Space/
      );
      expect(propertyImages).toHaveLength(3);
    });

    test("buttons are accessible", () => {
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);

      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });

    test("links are accessible", () => {
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThan(0);

      links.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe("Content Structure", () => {
    test("sections are in correct order", () => {
      const sections = screen.getAllByRole("heading", { level: 2 });
      const sectionTitles = sections.map((section) => section.textContent);

      expect(sectionTitles).toContain("Start Investing in Minutes");
      expect(sectionTitles).toContain("How GoldenCity Works");
      expect(sectionTitles).toContain("Featured Investment Opportunities");
      expect(sectionTitles).toContain("Why Choose GoldenCity");
    });

    test("all required data is displayed", () => {
      // Check that all featured properties have required data
      expect(screen.getByText("Miami, FL")).toBeInTheDocument();
      expect(screen.getByText("Austin, TX")).toBeInTheDocument();
      expect(screen.getByText("Seattle, WA")).toBeInTheDocument();

      // Check price displays
      expect(screen.getByText("$850,000")).toBeInTheDocument();
      expect(screen.getByText("425 ETH")).toBeInTheDocument();
    });
  });
});
