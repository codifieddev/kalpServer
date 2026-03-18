"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = exports.pageSchema = void 0;
const mongoose_1 = require("mongoose");
const seoSchema = new mongoose_1.Schema({
    metaTitle: {
        type: String,
        default: ""
    },
    metaDescription: {
        type: String,
        default: ""
    },
    ogImage: {
        type: String,
        default: ""
    }
}, { _id: false });
exports.pageSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    template: {
        type: String,
        default: ""
    },
    sections: {
        type: [mongoose_1.Schema.Types.Mixed],
        default: []
    },
    seo: {
        type: seoSchema,
        default: () => ({
            metaTitle: "",
            metaDescription: "",
            ogImage: ""
        })
    }
}, {
    timestamps: true
});
exports.pageSchema.index({ slug: 1 }, { unique: true });
exports.Page = (0, mongoose_1.model)("Page", exports.pageSchema);
