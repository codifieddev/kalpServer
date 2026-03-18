import { InferSchemaType, Schema, model } from "mongoose";

const seoSchema = new Schema(
  {
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
  },
  { _id: false }
);

export const pageSchema = new Schema(
  {
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
      type: [Schema.Types.Mixed],
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
  },
  {
    timestamps: true
  }
);

pageSchema.index({ slug: 1 }, { unique: true });

export type PageDocument = InferSchemaType<typeof pageSchema>;

export const Page = model<PageDocument>("Page", pageSchema);
