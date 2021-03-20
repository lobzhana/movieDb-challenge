import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://movie-db-user:0B4dsG5V2e76wxh2@moviedbcluster.gy9f1.mongodb.net/movieDb?retryWrites=true&w=majority',
    ),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
