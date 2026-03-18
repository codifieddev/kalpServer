import { InferSchemaType, Schema, model } from "mongoose";

export const formSchema = new Schema(
  {
 
    firstName: {
      type: String,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    type: {
      type: String,
      enum: ["residential", "commercial"],
      default: "residential"
    },
    postCode: {
      type: String,
      trim: true
    },
    averageBill: {
      type: String,
      trim: true
    },
    title: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
   
   
  },
  {
    timestamps: true,
    strict: false
  }
);

export type FormDocument = InferSchemaType<typeof formSchema>;

export const Form = model<FormDocument>("Form", formSchema);
