// Import mongoose helpers:
// Document = TypeScript type for MongoDB document
// Schema   = Defines structure of tenant collection
// model    = Creates a Model to interact with MongoDB
import { Document, Schema, model } from "mongoose";


// TypeScript interface = compile-time safety
// Extends Document so _id, timestamps are included
export interface ITenant extends Document {
    name: string;
    slug: string;   // URL-friendly tenant name (acme, globex)
    plan: "free" | "pro";    // Subscription plan
    noteLimit:  number    // Max notes if free plan
    createdAt: Date;
    updatedAt: Date;
}


// Mongoose Schema = runtime validation

const tenantSchema = new Schema<ITenant>({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true   // prevent two tenants having same slug
    },
    plan: {
        type: String,
        enum: ["free","pro"],
        default: "free"
    },
    noteLimit: {
        type: Number,
        default: 3
    }
}, {
    timestamps: true
});

// Creates a MongoDB model named "Tenant"
// Collection name = tenants

export const Tenant = model<ITenant>("Tenant", tenantSchema);