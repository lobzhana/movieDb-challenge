import { Document, Schema } from 'mongoose';
import { CountryModel } from '../models/country.model';


export type CountryDocument = CountryModel & Document;
export const CountrySchema = new Schema(
  {
    code: String,
    name: String,
  },
  {
    collection: 'countries',
  }
);
