import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitiza HTML para prevenir ataques XSS
 * Deve ser usado antes de renderizar com dangerouslySetInnerHTML
 */
export function sanitizeHtml(html: string): string {
    if (!html) return "";

    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            "p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li",
            "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "code", "pre",
            "img", "hr", "span", "div", "iframe"
        ],
        ALLOWED_ATTR: [
            "href", "target", "rel", "src", "alt", "class", "style", "width", "height",
            "allowfullscreen", "frameborder" // Para embeds do Google Maps
        ],
        ALLOW_DATA_ATTR: false,
    });
}

/**
 * Sanitiza especificamente embeds do Google Maps
 */
export function sanitizeMapEmbed(html: string): string {
    if (!html) return "";

    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ["iframe"],
        ALLOWED_ATTR: [
            "src", "width", "height", "style", "allowfullscreen", "frameborder",
            "loading", "referrerpolicy"
        ],
    });
}
