import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ScrollLink } from "@/components/ui/scroll-link";

describe("ScrollLink", () => {
    beforeEach(() => {
        // Mock scrollIntoView
        Element.prototype.scrollIntoView = vi.fn();
    });

    it("renders children correctly", () => {
        render(
            <ScrollLink to="section-id">
                Click me
            </ScrollLink>
        );

        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("renders as a button element", () => {
        render(
            <ScrollLink to="section-id">
                Button
            </ScrollLink>
        );

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "button");
    });

    it("applies custom className", () => {
        render(
            <ScrollLink to="section-id" className="custom-class">
                Styled
            </ScrollLink>
        );

        expect(screen.getByRole("button")).toHaveClass("custom-class");
    });

    it("applies custom style", () => {
        render(
            <ScrollLink to="section-id" style={{ backgroundColor: "red" }}>
                Styled
            </ScrollLink>
        );

        expect(screen.getByRole("button")).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
    });

    it("scrolls to element when clicked", () => {
        // Create a mock element
        const mockElement = document.createElement("div");
        mockElement.id = "target-section";
        document.body.appendChild(mockElement);

        render(
            <ScrollLink to="target-section">
                Scroll
            </ScrollLink>
        );

        fireEvent.click(screen.getByRole("button"));

        expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

        // Cleanup
        document.body.removeChild(mockElement);
    });

    it("does nothing when target element does not exist", () => {
        render(
            <ScrollLink to="non-existent">
                Scroll
            </ScrollLink>
        );

        // Should not throw
        expect(() => {
            fireEvent.click(screen.getByRole("button"));
        }).not.toThrow();
    });
});
