import { Document, Schema } from 'mongoose';
import { LanguageModel } from '../models/language.model';


export type LanguageDocument = LanguageModel & Document;
export const LanguageSchema = new Schema(
  {
    code: String,
    name: String,
  },
  { collection: 'languages' }
);
