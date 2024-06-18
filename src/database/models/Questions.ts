import { models, model } from 'mongoose';
import questionSchema, { IOTServer } from '../schemas/QuestionsSchema';

const Question = models.Question || model<IOTServer>('Question', questionSchema);

export default Question;

