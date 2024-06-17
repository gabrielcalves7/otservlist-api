import { model, models } from 'mongoose';
import oTServerSchema, { IOTServer } from "../schemas/OTServerSchema";

const OTServer = models.OTServer || model<IOTServer>('OTServer', oTServerSchema);

export default OTServer;

