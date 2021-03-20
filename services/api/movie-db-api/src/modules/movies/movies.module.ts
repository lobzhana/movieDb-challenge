import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudioSchema } from 'src/modules/movies/schema/studio.schema';
import { MoviesController } from './controllers/movies.controller';
import { CountryModel } from './models/country.model';
import { LanguageModel } from './models/language.model';
import { MovieModel } from './models/movie.model';
import { StudioModel } from './models/studio.model';
import { CountriesRepository } from './repositories/countries.repository';
import { LanguagesRepository } from './repositories/languages.repository';
import { MoviesRepository } from './repositories/movies.repository';
import { StudiosRepository } from './repositories/studios.repository';
import { CountrySchema } from './schema/country.schema';
import { LanguageSchema } from './schema/language.schema';
import { MovieSchema } from './schema/movie.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: StudioModel.name,
        schema: StudioSchema,
      },
      {
        name: LanguageModel.name,
        schema: LanguageSchema,
      },
      {
        name: CountryModel.name,
        schema: CountrySchema,
      },
      {
        name: MovieModel.name,
        schema: MovieSchema,
      },
    ]),
  ],
  controllers: [MoviesController],
  providers: [StudiosRepository, LanguagesRepository, CountriesRepository, MoviesRepository],
})
export class MoviesModule {}
