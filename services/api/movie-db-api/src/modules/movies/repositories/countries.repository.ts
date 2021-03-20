import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CountryDocument } from '../schema/country.schema';
import { CountryModel } from '../models/country.model';

export class CountriesRepository {
  constructor(
    @InjectModel(CountryModel.name) private dbModel: Model<CountryDocument>,
  ) {}

  async getAll(): Promise<CountryModel[]> {
    const query = this.dbModel.find();

    return await query.exec();
  }
}
