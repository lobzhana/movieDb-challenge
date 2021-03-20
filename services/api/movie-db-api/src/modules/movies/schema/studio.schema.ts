import { Document, Schema } from 'mongoose';
import { StudioModel } from '../models/studio.model';

export type StudioDocument = StudioModel & Document;
export const StudioSchema = new Schema(
  {
    id: String,
    name: String,
  },
  { collection: 'studios' },
);
