import { Schema } from 'mongoose';

export interface IUserType {
  name: string;
  active: boolean;
  createdAt: Date;
}

const userTypeSchema = new Schema<IUserType>({
  name: { type: String, required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export default userTypeSchema;
