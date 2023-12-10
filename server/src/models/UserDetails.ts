import mongoose, { Schema, Document } from "mongoose";

export interface IUserDetails extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phoneNumber: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    files: Array<{ [key: string]: any }>;  // Array of file paths
}

const userDetailsSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
    files: [
        {
            type: Object, // Allow any type of object in the array
        },
    ],
    options: [{ type: String }],
}, {
    timestamps: true,

});

export const UserDetailsModel = mongoose.model<IUserDetails>(
    "UserDetails",
    userDetailsSchema
);
