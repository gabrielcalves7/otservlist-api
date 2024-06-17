import { models, model } from 'mongoose';
import questionSchema, { IQuestion } from '../schemas/QuestionsSchema';

const Question = models.Question || model<IQuestion>('Question', questionSchema);

export default Question;

