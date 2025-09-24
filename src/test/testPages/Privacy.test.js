import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { motion } from "framer-motion";
import Privacy from "../../pages/Privacy.jsx";

// Mock framer-motion to avoid animation complexities in tests
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

// Mock intersection observer for motion animations
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe("Privacy Component", () => {
  beforeEach(() => {
    render(<Privacy />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Page Structure", () => {
    test("renders the main privacy policy heading", () => {
      expect(
        screen.getByRole("heading", { name: /privacy policy/i, level: 1 })
      ).toBeInTheDocument();
    });

    test("displays the last updated date", () => {
      expect(
        screen.getByText("Last updated: March 15, 2024")
      ).toBeInTheDocument();
    });

    test("renders all section headings", () => {
      const expectedSections = [
        "Introduction",
        "Information We Collect",
        "How We Use Your Information",
        "Cryptocurrency Transaction Privacy",
        "Data Security",
        "Information Sharing",
        "Your Rights",
        "Cookies and Tracking",
        "Changes to Privacy Policy",
        "Contact Us",
      ];

      expectedSections.forEach((section) => {
        expect(
          screen.getByRole("heading", { name: section, level: 2 })
        ).toBeInTheDocument();
      });
    });

    test("has correct number of sections", () => {
      const sectionHeadings = screen.getAllByRole("heading", { level: 2 });
      expect(sectionHeadings).toHaveLength(10);
    });
  });

  describe("Content Verification", () => {
    test("displays introduction content correctly", () => {
      expect(
        screen.getByText(/This Privacy Policy explains how GoldenCity/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/committed to ensuring the privacy and security/i)
      ).toBeInTheDocument();
    });

    test("shows information collection details", () => {
      expect(
        screen.getByText(/Personal identification information/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Government-issued ID for KYC verification/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Cryptocurrency wallet addresses/i)
      ).toBeInTheDocument();
    });

    test("displays cryptocurrency transaction privacy information", () => {
      expect(
        screen.getByText(/While blockchain transactions are publicly visible/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We never share your wallet addresses publicly/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/blockchain transactions are irreversible/i)
      ).toBeInTheDocument();
    });

    test("shows data security measures", () => {
      expect(
        screen.getByText(/End-to-end encryption for sensitive data/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Multi-factor authentication/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Secure cold storage for cryptocurrency assets/i)
      ).toBeInTheDocument();
    });

    test("displays user rights information", () => {
      expect(screen.getByText(/You have the right to:/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Access your personal information/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Request deletion of your data/i)
      ).toBeInTheDocument();
    });

    test("shows contact information", () => {
      expect(screen.getByText(/privacy@GoldenCity.com/i)).toBeInTheDocument();
      expect(
        screen.getByText(/123 Privacy Street, Real City, RC 12345/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We aim to respond to all inquiries within 48 hours/i)
      ).toBeInTheDocument();
    });
  });

  describe("CSS Classes and Styling", () => {
    test("applies correct container classes", () => {
      const container = document.querySelector(
        ".min-h-screen.bg-secondary-50.py-16"
      );
      expect(container).toBeInTheDocument();
    });

    test("applies correct styling to main content area", () => {
      const mainContent = document.querySelector(".max-w-4xl.mx-auto");
      expect(mainContent).toBeInTheDocument();
    });

    test("applies white background to content card", () => {
      const contentCard = document.querySelector(
        ".bg-white.rounded-lg.shadow-md.p-8"
      );
      expect(contentCard).toBeInTheDocument();
    });

    test("applies correct spacing to sections", () => {
      const sectionContainer = document.querySelector(".space-y-8");
      expect(sectionContainer).toBeInTheDocument();
    });
  });

  describe("Email Link", () => {
    test("privacy email is rendered as text (not clickable link)", () => {
      // Use a more flexible text matcher since the email is part of a larger text block
      const emailText = screen.getByText((content, element) => {
        return content.includes("privacy@GoldenCity.com");
      });
      expect(emailText).toBeInTheDocument();
      expect(emailText.tagName).not.toBe("A");
    });
  });

  describe("Text Formatting", () => {
    test("preserves line breaks in section content", () => {
      // Check if whitespace-pre-line class is applied
      const contentElements = document.querySelectorAll(".whitespace-pre-line");
      expect(contentElements.length).toBeGreaterThan(0);
    });

    test("applies secondary text color to content", () => {
      const contentElements = document.querySelectorAll(".text-secondary-600");
      expect(contentElements.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    test("has proper heading hierarchy", () => {
      const h1 = screen.getByRole("heading", { level: 1 });
      const h2s = screen.getAllByRole("heading", { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2s).toHaveLength(10);
    });

    test("main heading has correct text content", () => {
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toHaveTextContent("Privacy Policy");
    });
  });

  describe("Component Structure", () => {
    test("renders without crashing", () => {
      expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    });

    test("contains all required sections in correct order", () => {
      const headings = screen.getAllByRole("heading", { level: 2 });
      const headingTexts = headings.map((heading) => heading.textContent);

      expect(headingTexts[0]).toBe("Introduction");
      expect(headingTexts[1]).toBe("Information We Collect");
      expect(headingTexts[9]).toBe("Contact Us");
    });
  });

  describe("Content Completeness", () => {
    test("each section has non-empty content", () => {
      const sections = [
        "Introduction",
        "Information We Collect",
        "How We Use Your Information",
        "Cryptocurrency Transaction Privacy",
        "Data Security",
        "Information Sharing",
        "Your Rights",
        "Cookies and Tracking",
        "Changes to Privacy Policy",
        "Contact Us",
      ];

      sections.forEach((sectionTitle) => {
        const heading = screen.getByRole("heading", { name: sectionTitle });
        const sectionContainer = heading.closest("div");
        const contentDiv = sectionContainer.querySelector(
          ".text-secondary-600"
        );

        expect(contentDiv).toBeInTheDocument();
        expect(contentDiv.textContent.trim()).not.toBe("");
      });
    });
  });

  describe("Motion Component Integration", () => {
    test("motion.div components are rendered as regular divs in test environment", () => {
      // Since we mocked framer-motion, motion.div should render as regular div
      const motionDivs = document.querySelectorAll("div");
      expect(motionDivs.length).toBeGreaterThan(0);
    });
  });
});
