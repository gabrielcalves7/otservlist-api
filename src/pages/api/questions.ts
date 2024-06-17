// pages/api/questions.ts

import { NextApiRequest, NextApiResponse } from 'next';
import database from '@/database/index';
import { createQuestion, getQuestion } from "@/database/controllers/QuestionController";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(200).end();
    return;
  }
  
  await database.connect();
  
  try {
    switch (req.method) {
      case 'POST':
        // Create a new question
        console.log(req.body);
        const newQuestion = await createQuestion(req.body);
        res.status(201).json({ message: 'Question created.', question: newQuestion });
        break;
      case 'GET':
        const questions = await getQuestion();
        if (questions) {
          res.status(200).json({ message: 'Fetched Successfully.', questions });
        } else {
          res.status(404).json({ message: 'Questions not found' });
        }
        break;
      default:
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await database.disconnect();
  }
}
