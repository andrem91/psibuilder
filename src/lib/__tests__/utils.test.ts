import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn (classnames utility)", () => {
    it("should merge class names", () => {
        const result = cn("class1", "class2");
        expect(result).toContain("class1");
        expect(result).toContain("class2");
    });

    it("should handle conditional classes", () => {
        const result = cn("base", true && "active", false && "hidden");
        expect(result).toContain("base");
        expect(result).toContain("active");
        expect(result).not.toContain("hidden");
    });

    it("should handle undefined and null values", () => {
        const result = cn("base", undefined, null);
        expect(result).toBe("base");
    });

    it("should merge Tailwind classes correctly", () => {
        // tailwind-merge should deduplicate conflicting classes
        const result = cn("px-4", "px-8");
        expect(result).toBe("px-8");
    });

    it("should handle empty input", () => {
        const result = cn();
        expect(result).toBe("");
    });

    it("should handle array of classes from clsx", () => {
        const result = cn(["class1", "class2"]);
        expect(result).toContain("class1");
        expect(result).toContain("class2");
    });
});
