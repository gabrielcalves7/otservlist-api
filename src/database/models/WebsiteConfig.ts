import { models, model } from 'mongoose';
import websiteConfigSchema, { IWebsiteConfig } from '../schemas/WebsiteConfigSchema';

const WebsiteConfig = models.WebsiteConfig || model<IWebsiteConfig>('WebsiteConfig', websiteConfigSchema);

export default WebsiteConfig;