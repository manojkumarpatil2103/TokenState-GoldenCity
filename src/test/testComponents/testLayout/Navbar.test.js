// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Navbar from "../../../components/layout/Navbar.jsx";

// Mock react-icons/fi
jest.mock("react-icons/fi", () => ({
  FiMenu: ({ size }) => (
    <div data-testid="menu-icon" data-size={size}>
      Menu
    </div>
  ),
  FiX: ({ size }) => (
    <div data-testid="close-icon" data-size={size}>
      Close
    </div>
  ),
}));

// Wrapper component to provide Router context
const NavbarWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Navbar Component", () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    test("renders navbar with logo and brand name", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      // Check if logo SVG is present
      const logo = screen.getByRole("link", { name: /goldencity/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("href", "/");

      // Check if brand name is present
      expect(screen.getByText("GoldenCity")).toBeInTheDocument();
    });

    test("renders all navigation items in desktop view", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const navigationItems = ["Home", "Properties", "About", "FAQ", "Blog"];

      navigationItems.forEach((item) => {
        expect(screen.getByRole("link", { name: item })).toBeInTheDocument();
      });
    });

    test("renders desktop Connect button", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const connectButtons = screen.getAllByText("Connect");
      expect(connectButtons).toHaveLength(1); // One for desktop, one for mobile (hidden)
    });

    test("renders mobile menu button", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const mobileMenuButton = screen.getByRole("button", { name: /menu/i });
      expect(mobileMenuButton).toBeInTheDocument();
    });
  });

  describe("Navigation Links", () => {
    test("navigation links have correct href attributes", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const expectedLinks = [
        { name: "Home", href: "/" },
        { name: "Properties", href: "/properties" },
        { name: "About", href: "/about" },
        { name: "FAQ", href: "/faq" },
        { name: "Blog", href: "/blog" },
      ];

      expectedLinks.forEach(({ name, href }) => {
        const link = screen.getByRole("link", { name });
        expect(link).toHaveAttribute("href", href);
      });
    });

    test("logo link navigates to home page", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const logoLink = screen.getByRole("link", { name: /goldencity/i });
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  describe("Mobile Menu Functionality", () => {
    test("mobile menu is initially closed", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      // Mobile menu should not be visible initially
      const mobileNavigation = screen.queryByRole("navigation");
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("close-icon")).not.toBeInTheDocument();
    });

    test("clicking mobile menu button opens the menu", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuButton = screen.getByRole("button", { name: /menu/i });

      // Click to open menu
      fireEvent.click(menuButton);

      // Menu should now show close icon
      expect(screen.getByTestId("close-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("menu-icon")).not.toBeInTheDocument();
    });

    test("clicking mobile menu button twice toggles the menu", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuButton = screen.getByRole("button", { name: /menu/i });

      // Initially closed - should show menu icon
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();

      // Click to open
      fireEvent.click(menuButton);
      expect(screen.getByTestId("close-icon")).toBeInTheDocument();

      // Click to close
      fireEvent.click(menuButton);
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    });

    test("clicking navigation link in mobile menu closes the menu", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuButton = screen.getByRole("button", { name: /menu/i });

      // Open the menu
      fireEvent.click(menuButton);
      expect(screen.getByTestId("close-icon")).toBeInTheDocument();

      // Click on a navigation link in mobile menu
      const mobileLinks = screen.getAllByRole("link", { name: "Home" });
      // Find the mobile version (should be the second one or check for specific class)
      const mobileHomeLink = mobileLinks.find((link) =>
        link.className.includes("block")
      );

      if (mobileHomeLink) {
        fireEvent.click(mobileHomeLink);
      }

      // Menu should close
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    });

    test("clicking Connect button in mobile menu closes the menu", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuButton = screen.getByRole("button", { name: /menu/i });

      // Open the menu
      fireEvent.click(menuButton);
      expect(screen.getByTestId("close-icon")).toBeInTheDocument();

      // Click on mobile Connect button
      const connectButtons = screen.getAllByText("Connect");
      const mobileConnectButton = connectButtons.find((button) =>
        button.className.includes("block")
      );

      if (mobileConnectButton) {
        fireEvent.click(mobileConnectButton);
      }

      // Menu should close
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    test("applies correct CSS classes for responsive design", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      // Check desktop navigation classes
      const desktopNav = screen.getByRole("link", { name: "Home" });
      expect(desktopNav).toHaveClass(
        "text-secondary-600",
        "hover:text-primary-600"
      );

      // Check mobile menu button has correct classes
      const menuButton = screen.getByRole("button", { name: /menu/i });
      expect(menuButton).toHaveClass(
        "text-secondary-600",
        "hover:text-primary-600"
      );
    });
  });

  describe("Icon Rendering", () => {
    test("menu icon has correct size prop", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuIcon = screen.getByTestId("menu-icon");
      expect(menuIcon).toHaveAttribute("data-size", "24");
    });

    test("close icon has correct size prop when menu is open", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuButton = screen.getByRole("button", { name: /menu/i });
      fireEvent.click(menuButton);

      const closeIcon = screen.getByTestId("close-icon");
      expect(closeIcon).toHaveAttribute("data-size", "24");
    });
  });

  describe("Accessibility", () => {
    test("mobile menu button has proper type attribute", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuButton = screen.getByRole("button", { name: /menu/i });
      expect(menuButton).toHaveAttribute("type", "button");
    });

    test("navigation links are accessible", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const navigationItems = ["Home", "Properties", "About", "FAQ", "Blog"];

      navigationItems.forEach((item) => {
        const link = screen.getByRole("link", { name: item });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href");
      });
    });
  });

  describe("Component State", () => {
    test("isOpen state changes correctly", () => {
      render(
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
      );

      const menuButton = screen.getByRole("button", { name: /menu/i });

      // Initial state - menu closed
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();

      // Open menu
      fireEvent.click(menuButton);
      expect(screen.getByTestId("close-icon")).toBeInTheDocument();

      // Close menu
      fireEvent.click(menuButton);
      expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
    });
  });
});

// Mobile menu renders navigation links only when isOpen is true
test("mobile navigation links are only visible when menu is open", () => {
  render(
    <NavbarWrapper>
      <Navbar />
    </NavbarWrapper>
  );

  // Links should not be visible initially
  expect(screen.queryByText("Home")).toBeInTheDocument(); // desktop link
  expect(
    screen.queryByText("Home", { selector: "a.block" })
  ).not.toBeInTheDocument(); // mobile link

  // Open the menu
  fireEvent.click(screen.getByRole("button", { name: /menu/i }));

  // Mobile version should now appear
  expect(screen.getByText("Home", { selector: "a.block" })).toBeInTheDocument();
});

// Clicking outside does NOT close menu
test("clicking outside menu does not close it", () => {
  render(
    <NavbarWrapper>
      <Navbar />
    </NavbarWrapper>
  );

  fireEvent.click(screen.getByRole("button", { name: /menu/i })); // open
  expect(screen.getByTestId("close-icon")).toBeInTheDocument();

  fireEvent.click(document.body); // outside
  expect(screen.getByTestId("close-icon")).toBeInTheDocument(); // still open
});

// Snapshot test – catch unintended UI changes in Navbar.
test("matches snapshot", () => {
  const { asFragment } = render(
    <NavbarWrapper>
      <Navbar />
    </NavbarWrapper>
  );
  expect(asFragment()).toMatchSnapshot();
});

/**Check Connect button actions
 * You already test that it closes menu on mobile, but not that desktop Connect button stays visible and doesn’t toggle isOpen */
test("desktop Connect button does not toggle mobile menu", () => {
  render(
    <NavbarWrapper>
      <Navbar />
    </NavbarWrapper>
  );

  const desktopConnect = screen.getAllByText("Connect")[0];
  fireEvent.click(desktopConnect);

  // Should still show menu icon (unchanged state)
  expect(screen.getByTestId("menu-icon")).toBeInTheDocument();
});

// Brand name accessibility – ensure "GoldenCity" brand link is accessible by name.
test("brand link has accessible name", () => {
  render(
    <NavbarWrapper>
      <Navbar />
    </NavbarWrapper>
  );

  const brandLink = screen.getByRole("link", { name: /goldencity/i });
  expect(brandLink).toHaveAccessibleName("GoldenCity");
});
