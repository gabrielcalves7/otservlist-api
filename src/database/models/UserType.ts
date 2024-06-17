import { model } from 'mongoose';
import userTypeSchema, { IUserType } from "../schemas/UserTypeSchema";

const UserType = model<IUserType>('UserType', userTypeSchema);

export default UserType;
