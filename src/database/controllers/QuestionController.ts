import { IQuestion } from '@/database/schemas/QuestionsSchema';
import Question from "@/database/models/Questions";

// Create a new user
export const createQuestion = async (data: Partial<IQuestion>): Promise<IQuestion> => {
  const question = new Question(data);
  return await question.save();
};

export const getQuestion = async (): Promise <IQuestion[]> => {
  try {
    return await Question.find();
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Error fetching questions');
  }
}