import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LanguageModel } from '../models/language.model';
import { LanguageDocument } from '../schema/language.schema';

export class LanguagesRepository {
  constructor(
    @InjectModel(LanguageModel.name) private dbModel: Model<LanguageDocument>,
  ) {}

  async getAll(): Promise<LanguageModel[]> {
    const query = this.dbModel.find();

    return await query.exec();
  }
}
