import { Document, Schema } from 'mongoose';

export interface IOTServerStatus extends Document {
  name: string;
}

// Mongoose schema definition
const OTServerStatusSchema = new Schema<IOTServerStatus>({
  name: { type: String, required: true },
});

export default OTServerStatusSchema;
