import User from '@/database/models/User';
import { IUser } from '@/database/schemas/UserSchema';

// Create a new user
export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
  const newUser = new User(data);
  return await newUser.save();
};

export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

// Delete a user by ID
export const deleteUser = async (id: string): Promise<IUser | null> => {
  return User.findByIdAndDelete(id);
};
