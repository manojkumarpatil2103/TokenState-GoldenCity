import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom";
import App from "../../pages/Property3D.jsx";

// Mock the external dependencies
jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children, shadows, camera }) => (
    <div
      data-testid="canvas"
      data-shadows={shadows}
      data-camera={JSON.stringify(camera)}
    >
      {children}
    </div>
  ),
}));

jest.mock("leva", () => ({
  Leva: ({ hidden }) => <div data-testid="leva" data-hidden={hidden} />,
}));

// Update these paths to match your actual component locations
jest.mock("../../components/property/Experience", () => ({
  Experience: () => <div data-testid="experience" />,
}));

jest.mock("../../components/property/Overlay", () => ({
  Overlay: () => <div data-testid="overlay" />,
}));

describe("App Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders loading screen initially", () => {
    render(<App />);

    // Check if loading text is displayed
    expect(screen.getByText("Please wait...")).toBeInTheDocument();

    // Check if loading div has correct classes
    const loadingDiv = screen.getByText("Please wait...");
    expect(loadingDiv).toHaveClass(
      "absolute",
      "z-50",
      "inset-0",
      "w-full",
      "h-full",
      "flex",
      "justify-center",
      "items-center",
      "text-primary-700",
      "text-xl",
      "md:text-3xl",
      "text-center",
      "font-bold"
    );
  });

  test("hides loading screen after 1 second", async () => {
    render(<App />);

    // Initially loading should be visible
    expect(screen.getByText("Please wait...")).toBeInTheDocument();

    // Fast-forward time by 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Loading screen should be gone
    await waitFor(() => {
      expect(screen.queryByText("Please wait...")).not.toBeInTheDocument();
    });
  });

  test("renders all components after loading", async () => {
    render(<App />);

    // Fast-forward time to complete loading
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      // Check if all main components are rendered
      expect(screen.getByTestId("leva")).toBeInTheDocument();
      expect(screen.getByTestId("overlay")).toBeInTheDocument();
      expect(screen.getByTestId("canvas")).toBeInTheDocument();
      expect(screen.getByTestId("experience")).toBeInTheDocument();
    });
  });

  test("renders Leva component with hidden prop", async () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const levaComponent = screen.getByTestId("leva");
      expect(levaComponent).toHaveAttribute("data-hidden", "true");
    });
  });

  test("renders Canvas with correct props", async () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const canvasComponent = screen.getByTestId("canvas");
      expect(canvasComponent).toHaveAttribute("data-shadows", "true");

      const expectedCamera = JSON.stringify({ position: [0, 0, 5], fov: 30 });
      expect(canvasComponent).toHaveAttribute("data-camera", expectedCamera);
    });
  });

  test("renders main container with correct classes", () => {
    render(<App />);

    const mainContainer = screen
      .getByText("Please wait...")
      .closest("div").parentElement;
    expect(mainContainer).toHaveClass(
      "absolute",
      "z-50",
      "inset-0",
      "bg-white"
    );
  });

  test("loading state changes correctly over time", async () => {
    render(<App />);

    // Initially loading should be true
    expect(screen.getByText("Please wait...")).toBeInTheDocument();

    // After 500ms, should still be loading
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByText("Please wait...")).toBeInTheDocument();

    // After full 1000ms, should not be loading
    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(screen.queryByText("Please wait...")).not.toBeInTheDocument();
    });
  });

  test("Experience component is rendered inside Canvas", async () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const canvas = screen.getByTestId("canvas");
      const experience = screen.getByTestId("experience");
      expect(canvas).toContainElement(experience);
    });
  });

  test("Canvas is rendered after loading", async () => {
    render(<App />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByTestId("canvas")).toBeInTheDocument();
    });
  });

  test("component unmounts cleanly", () => {
    const { unmount } = render(<App />);

    // Should unmount without errors
    expect(() => unmount()).not.toThrow();
  });
});

// Additional test for useEffect cleanup (if needed)
describe("App Component - useEffect behavior", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("useEffect runs only once", () => {
    const setTimeoutSpy = jest.spyOn(global, "setTimeout");

    render(<App />);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

    setTimeoutSpy.mockRestore();
  });

  test("loading starts as true and becomes false after timeout", async () => {
    render(<App />);

    // Initially should show loading
    expect(screen.getByText("Please wait...")).toBeInTheDocument();

    // Advance timers
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Should no longer show loading
    await waitFor(() => {
      expect(screen.queryByText("Please wait...")).not.toBeInTheDocument();
    });
  });
});
