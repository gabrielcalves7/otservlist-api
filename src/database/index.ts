import mongoose, { Mongoose } from 'mongoose';

mongoose.set("strictQuery", true);

const dbname: string = "";
const uri: string = process.env.NEXT_PUBLIC_MONGODB_URI as string;

const connect = async (): Promise<Mongoose> => {
  return await mongoose.connect(uri);
}

const disconnect = async (): Promise<void> => {
  return await mongoose.disconnect();
}

const database = {
  connect,
  disconnect,
};

export default database;
