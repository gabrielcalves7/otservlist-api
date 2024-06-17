import { Schema } from 'mongoose';

export interface IQuestion {
  origin: string;
  question: string;
  answer: string;
  createdAt: Date;
}

const questionSchema = new Schema<IQuestion>({
  origin: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default questionSchema;
