"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePageInput = void 0;
const ensureNonEmptyString = (value, fieldName) => {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`${fieldName} is required and must be a non-empty string`);
    }
    return value.trim();
};
const ensureOptionalString = (value) => {
    if (value === undefined || value === null) {
        return "";
    }
    if (typeof value !== "string") {
        throw new Error("Optional string fields must be strings");
    }
    return value;
};
const parsePageInput = (payload) => {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        throw new Error("Request body must be a valid JSON object");
    }
    const body = payload;
    const sections = body.sections;
    if (sections !== undefined && !Array.isArray(sections)) {
        throw new Error("sections must be an array");
    }
    const seo = body.seo;
    if (seo !== undefined && (typeof seo !== "object" || seo === null || Array.isArray(seo))) {
        throw new Error("seo must be an object");
    }
    const seoObject = seo ?? {};
    return {
        title: ensureNonEmptyString(body.title, "title"),
        slug: ensureNonEmptyString(body.slug, "slug"),
        content: ensureOptionalString(body.content),
        status: ensureOptionalString(body.status),
        type: ensureNonEmptyString(body.type, "type"),
        template: ensureOptionalString(body.template),
        sections: sections ?? [],
        seo: {
            metaTitle: ensureOptionalString(seoObject.metaTitle),
            metaDescription: ensureOptionalString(seoObject.metaDescription),
            ogImage: ensureOptionalString(seoObject.ogImage)
        }
    };
};
exports.parsePageInput = parsePageInput;
