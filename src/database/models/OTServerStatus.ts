import { model, models } from 'mongoose';
import oTServerStatusSchema, { IOTServerStatus } from "../schemas/OTServerStatusSchema";

const OTServerStatus = models.OTServerStatus || model<IOTServerStatus>('OTServerStatus', oTServerStatusSchema);

export default OTServerStatus;

