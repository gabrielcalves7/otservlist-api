import { NextApiRequest, NextApiResponse } from 'next';
import database from "@/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    await database.connect();
    res.status(200).json({ message: "API is currently online." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to connect to the database." });
  }
}
