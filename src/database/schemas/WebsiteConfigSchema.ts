import { Schema, Document } from 'mongoose';

// Define interface for website configuration document
export interface IWebsiteConfig extends Document {
  whatsapp?: string;
  linkedin?: string;
  github?: string;
  phoneNumber?: string;
  email?: string;
}

// Define the schema for the website_config table
const websiteConfigSchema = new Schema<IWebsiteConfig>({
  whatsapp: { type: String },
  linkedin: { type: String },
  github: { type: String },
  phoneNumber: { type: String },
  email: { type: String }
});

export default websiteConfigSchema;
