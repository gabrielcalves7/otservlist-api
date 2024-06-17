import { models, model } from 'mongoose';
import userSchema, { IUser } from '../schemas/UserSchema';

const User = models.User || model<IUser>('User', userSchema);

export default User;

