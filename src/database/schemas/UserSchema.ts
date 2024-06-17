import { Schema, Document, Types } from 'mongoose';
import UserType from './UserTypeSchema'; // Import the UserType schema

// TypeScript interface extending mongoose.Document
export interface IUser extends Document {
  name: string;
  userName: string;
  password: string;
  active: boolean;
  email: string;
  userTypeId: Types.ObjectId; // User type reference
}

// Mongoose schema definition
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true },
  userTypeId: { type: Schema.Types.ObjectId, ref: 'UserType', required: true }
});

export default userSchema;
