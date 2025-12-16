import { describe, it, expect } from "vitest";
import { sanitizeHtml, sanitizeMapEmbed } from "../sanitize";

describe("sanitizeHtml", () => {
    it("should return empty string for falsy input", () => {
        expect(sanitizeHtml("")).toBe("");
        expect(sanitizeHtml(null as unknown as string)).toBe("");
        expect(sanitizeHtml(undefined as unknown as string)).toBe("");
    });

    it("should allow basic formatting tags", () => {
        const input = "<p>Hello <strong>World</strong>!</p>";
        const result = sanitizeHtml(input);
        expect(result).toContain("<p>");
        expect(result).toContain("<strong>");
    });

    it("should remove script tags", () => {
        const input = '<script>alert("XSS")</script><p>Safe content</p>';
        const result = sanitizeHtml(input);
        expect(result).not.toContain("<script>");
        expect(result).not.toContain("alert");
        expect(result).toContain("<p>Safe content</p>");
    });

    it("should remove onclick attributes", () => {
        const input = '<p onclick="alert(1)">Click me</p>';
        const result = sanitizeHtml(input);
        expect(result).not.toContain("onclick");
        expect(result).toContain("<p>");
    });

    it("should allow links with href", () => {
        const input = '<a href="https://example.com">Link</a>';
        const result = sanitizeHtml(input);
        expect(result).toContain("href");
        expect(result).toContain("https://example.com");
    });

    it("should preserve list elements", () => {
        const input = "<ul><li>Item 1</li><li>Item 2</li></ul>";
        const result = sanitizeHtml(input);
        expect(result).toContain("<ul>");
        expect(result).toContain("<li>");
    });
});

describe("sanitizeMapEmbed", () => {
    it("should return empty string for falsy input", () => {
        expect(sanitizeMapEmbed("")).toBe("");
        expect(sanitizeMapEmbed(null as unknown as string)).toBe("");
    });

    it("should allow Google Maps iframe", () => {
        const input =
            '<iframe src="https://maps.google.com/maps?q=..." width="600" height="450" allowfullscreen></iframe>';
        const result = sanitizeMapEmbed(input);
        expect(result).toContain("<iframe");
        expect(result).toContain("src=");
    });

    it("should remove non-iframe elements", () => {
        const input = '<div><iframe src="https://maps.google.com"></iframe></div>';
        const result = sanitizeMapEmbed(input);
        expect(result).not.toContain("<div>");
        expect(result).toContain("<iframe");
    });

    it("should remove dangerous attributes from iframe", () => {
        const input =
            '<iframe src="https://maps.google.com" onload="alert(1)"></iframe>';
        const result = sanitizeMapEmbed(input);
        expect(result).not.toContain("onload");
        expect(result).toContain("<iframe");
    });
});
