import mongoose, {Schema, InferSchemaType, Model} from "mongoose";

// Define the schema for the User model
const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: { type: String, required: true },
}, {timestamps: true});

// Infer TypeScript type from schema
type UserType = InferSchemaType<typeof userSchema>;

// Create Mongoose model with inferred type

const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;