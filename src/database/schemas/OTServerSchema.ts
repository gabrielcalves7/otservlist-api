import { Document, Schema, Types } from 'mongoose';

export interface IOTServer extends Document {
  name: string;
  url: string;
  active: boolean;
  email: string;
  initialRate: number,
  status: Types.ObjectId,
  ownerId: Types.ObjectId; // User type reference
  launchDate: Date,
  createdAt: Date;
  location: string;
}

// Mongoose schema definition
const oTServerSchema = new Schema<IOTServer>({
  name: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  launchDate: { type: Date },
  initialRate: { type: Number },
  active: { type: Boolean, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: Schema.Types.ObjectId, ref: 'OTServerStatus', required: true },
  location: { type: String }
});

export default oTServerSchema;
