import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StudioDocument } from '../schema/studio.schema';
import { StudioModel } from '../models/studio.model';

export class StudiosRepository {
  constructor(
    @InjectModel(StudioModel.name) private dbModel: Model<StudioDocument>,
  ) {}

  async getAll(): Promise<StudioModel[]> {
    const query = this.dbModel.find();

    return await query.exec();
  }
}
