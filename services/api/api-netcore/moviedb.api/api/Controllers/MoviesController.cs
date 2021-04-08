using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("movies")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieRepository repository;

        public MoviesController(IMovieRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchAsync([FromQuery] MovieSearchFilter searchFilter)
        {
            var result = await repository.SearchAsync(searchFilter);

            return Ok(result);
        }

        [HttpGet("{movieId}")]
        public async Task<IActionResult> GetAsync(string movieId)
        {
            var result = await repository.GetAsync(movieId);
            if (result != null)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] MovieDataModel model)
        {
            var result = await repository.CreateAsync(model);
            if (result.Ok)
            {
                return Ok(result);
            }

            return BadRequest(result.Message);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAsync([FromBody] MovieDataModel model)
        {
            var result = await repository.UpdateAsync(model);
            if (result.Ok)
            {
                return Ok(result);
            }

            return BadRequest(result.Message);
        }

        [HttpDelete("{movieId}")]
        public async Task<IActionResult> DeleteAsync(string movieId)
        {
            var result = await repository.DeleteAsync(movieId);
            if (result.Ok)
            {
                return Ok(result);
            }

            return BadRequest(result.Message);
        }

        [HttpGet("years")]
        public async Task<IActionResult> GetYearsAsync()
        {
            var years = new[] { 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2021 };

            await Task.CompletedTask;

            return Ok(years);
        }
    }

    [ApiController]
    [Route("photos")]
    public class PhotosController : ControllerBase
    {
        [HttpPost("upload")]
        public async Task<IActionResult> UploadAsync([FromForm(Name = "photo")] IFormFile formFile)
        {
            var randomName = $"{Convert.ToString(Guid.NewGuid())}-{formFile.FileName}";

            var destination = Path.Combine("Uploads", "Photos", randomName);

            using (var fs = new FileStream(destination, FileMode.Create))
            {
                using (var stream = formFile.OpenReadStream())
                {
                    await stream.CopyToAsync(fs);
                }
            }

            return Ok(new { FileName = randomName }); ;
        }

        [HttpGet("{fileName}")]
        public IActionResult GetCover(string fileName)
        {
            var destination = Path.Combine
                (
                    Directory.GetCurrentDirectory(),
                    "Uploads",
                    "Photos",
                    fileName
                );

            if (!System.IO.File.Exists(destination))
            {
                return NotFound();
            };

            new FileExtensionContentTypeProvider().TryGetContentType(destination, out var contentType);

            return PhysicalFile(destination, contentType);
        }
    }


    public class UploadDataModel
    {
        public IFormFile Cover { get; set; }
    }

    public interface IMovieRepository
    {
        Task<List<MovieListItemDataModel>> SearchAsync(MovieSearchFilter searchFilter);
        Task<MovieDataModel> GetAsync(string movieId);
        Task<Result> CreateAsync(MovieDataModel model);
        Task<Result> UpdateAsync(MovieDataModel model);
        Task<Result> DeleteAsync(string movieId);
        Task<Result> AddCastMembersAsync(string movieId, List<string> castMemberIds);
        Task<Result> RemoveCastMemberAsync(string movieId, string castMemberId);
    }

    public static class MongoDbConnectionFactory
    {
        public static IMongoCollection<TDataModel> GetCollection<TDataModel>(string name)
        {
            var connectionString = "mongodb+srv://movie-db-user:0B4dsG5V2e76wxh2@moviedbcluster.gy9f1.mongodb.net/movieDb?retryWrites=true&w=majority";
            var mongoClient = new MongoClient(connectionString);
            var database = mongoClient.GetDatabase("movieDb");

            return database.GetCollection<TDataModel>(name);
        }
    }

    public class MoviesRepository : IMovieRepository
    {
        private readonly IMongoCollection<MovieDataModel> collection;

        public MoviesRepository()
        {
            collection = MongoDbConnectionFactory.GetCollection<MovieDataModel>("movies");
        }

        public async Task<Result> CreateAsync(MovieDataModel model)
        {
            if (!string.IsNullOrWhiteSpace(model.MovieId))
            {
                return new Result(false, "MovieId should not be provided during creation");
            }

            model.MovieId = Convert.ToString(Guid.NewGuid());
            model.CreateAt = DateTime.UtcNow;

            await collection.InsertOneAsync(model);

            return new Result(true);
        }

        public async Task<Result> UpdateAsync(MovieDataModel model)
        {
            if (string.IsNullOrWhiteSpace(model.MovieId))
            {
                return new Result(false, "MovieId must be provided during update");

            }

            var document = await GetAsync(model.MovieId);
            if (document == null)
            {
                return new Result(false, "Movie not found");
            }

            model.CreateAt = document.CreateAt;

            await collection.ReplaceOneAsync
            (
                Builders<MovieDataModel>.Filter.Eq(doc => doc.MovieId, model.MovieId),
                model
            );

            return new Result(true);

        }

        public async Task<Result> DeleteAsync(string movieId)
        {
            if (string.IsNullOrWhiteSpace(movieId))
            {
                return new Result(false, "MovieId must be provided during delete");
            }

            await collection.DeleteOneAsync(Builders<MovieDataModel>.Filter.Eq(doc => doc.MovieId, Convert.ToString(movieId)));

            return new Result(true);
        }

        public async Task<MovieDataModel> GetAsync(string movieId)
        {
            var result = await collection.Find
            (
                    Builders<MovieDataModel>.Filter
                    .Eq(model => model.MovieId, movieId)
            ).FirstOrDefaultAsync();

            return result;
        }

        public async Task<List<MovieListItemDataModel>> SearchAsync(MovieSearchFilter searchFilter)
        {
            var query = collection.AsQueryable();
            query = ApplyFilters(query, searchFilter);

            return
                await query.OrderByDescending(doc => doc.CreateAt)
                .Select(doc => new MovieListItemDataModel
                {
                    Id = doc.MovieId,
                    Title = doc.Title,
                    Cover = doc.Cover != null ? doc.Cover.FileName : string.Empty,
                    Description = doc.Description,
                    Duration = doc.Duration,
                    ImdbRating = doc.Imdb != null ? doc.Imdb.Rating : 0,
                    Year = doc.Year
                }).ToListAsync();
        }

        private IMongoQueryable<MovieDataModel> ApplyFilters(IMongoQueryable<MovieDataModel> query, MovieSearchFilter searchFilter)
        {
            if (!string.IsNullOrWhiteSpace(searchFilter.SearchValue))
            {
                query = query.Where(doc => doc.Title.Contains(searchFilter.SearchValue));
            }

            if (searchFilter.AvailableIn != null && searchFilter.AvailableIn.Any())
            {
                query = query.Where(doc => doc.AvailableIn.Any(lang => searchFilter.AvailableIn.Contains(lang.Code)));
            }

            if (searchFilter.Years != null && searchFilter.Years.Any())
            {
                query = query.Where(doc => searchFilter.Years.Contains(doc.Year));
            }

            if (searchFilter.Countries != null && searchFilter.Countries.Any())
            {
                query = query.Where(doc => doc.Countries.Any(country => searchFilter.Countries.Contains(country.Code)));
            }

            if (searchFilter.Studios != null && searchFilter.Studios.Any())
            {
                query = query.Where(doc => doc.Studios.Any(studio => searchFilter.Studios.Contains(studio.UId)));
            }

            if (searchFilter.ImdbFrom != null)
            {
                query = query.Where(doc => doc.Imdb.Rating >= searchFilter.ImdbFrom);
            }

            if (searchFilter.ImdbTo != null)
            {
                query = query.Where(doc => doc.Imdb.Rating <= searchFilter.ImdbTo);
            }

            return query;
        }

        public async Task<Result> AddCastMembersAsync(string movieId, List<string> castMemberIds)
        {
            var result = await collection.UpdateOneAsync
                (
                    Builders<MovieDataModel>.Filter.Eq(doc => doc.MovieId, movieId),
                    Builders<MovieDataModel>.Update.PushEach(doc => doc.CastMemberIds, castMemberIds)
                );


            return new Result(result.ModifiedCount >= 1);
        }

        public async Task<Result> RemoveCastMemberAsync(string movieId, string castMemberId)
        {
            var result = await collection.UpdateOneAsync
                       (
                           Builders<MovieDataModel>.Filter.Eq(doc => doc.MovieId, movieId),
                           Builders<MovieDataModel>.Update.PullAll(doc => doc.CastMemberIds, new List<string>() { castMemberId })
                       );

            return new Result(result.ModifiedCount > 0);
        }
    }

    public class Result
    {
        public bool Ok { get; set; }

        public string Message { get; set; }

        public object Data { get; set; }

        public Result(bool ok)
        {
            Ok = ok;
        }

        public Result(bool ok, string message) : this(ok)
        {
            Message = message;
        }
    }

    public class MovieListItemDataModel
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Year { get; set; }

        public int Duration { get; set; }

        public decimal ImdbRating { get; set; }

        public string Cover { get; set; }
    }

    [ApiController]
    [Route("countries")]

    public class CountriesController : ControllerBase
    {
        private readonly ICountriesRepository repository;

        public CountriesController(ICountriesRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await repository.GetAllAsync();

            return Ok(result);
        }
    }

    public interface ICountriesRepository
    {
        Task<List<CountryDataModel>> GetAllAsync();
    }

    public class CountriesRepository : ICountriesRepository
    {
        private readonly IMongoCollection<CountryDataModel> collection;

        public CountriesRepository()
        {
            collection = MongoDbConnectionFactory.GetCollection<CountryDataModel>("countries");
        }

        public async Task<List<CountryDataModel>> GetAllAsync()
        {
            var result = await collection.Find(Builders<CountryDataModel>.Filter.Empty).ToListAsync();

            return result;
        }
    }

    [ApiController]
    [Route("languages")]

    public class LanguagesController : ControllerBase
    {
        private readonly ILanguagesRepository repository;

        public LanguagesController(ILanguagesRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await repository.GetAllAsync();

            return Ok(result);
        }
    }

    public interface ILanguagesRepository
    {
        Task<List<LanguageDataModel>> GetAllAsync();
    }

    public class LanguagesRepository : ILanguagesRepository
    {
        private readonly IMongoCollection<LanguageDataModel> collection;

        public LanguagesRepository()
        {
            collection = MongoDbConnectionFactory.GetCollection<LanguageDataModel>("languages");

        }

        public async Task<List<LanguageDataModel>> GetAllAsync()
        {
            var result = await collection.Find(Builders<LanguageDataModel>.Filter.Empty).ToListAsync();

            return result;
        }
    }

    [ApiController]
    [Route("studios")]

    public class StudiosController : ControllerBase
    {
        private readonly IStudiosRepository repository;

        public StudiosController(IStudiosRepository repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await repository.GetAllAsync();

            return Ok(result);
        }
    }

    public interface IStudiosRepository
    {
        Task<List<StudioDataModel>> GetAllAsync();
    }

    public class StudiosRepository : IStudiosRepository
    {
        private readonly IMongoCollection<StudioDataModel> collection;

        public StudiosRepository()
        {
            collection = MongoDbConnectionFactory.GetCollection<StudioDataModel>("studios");
        }

        public async Task<List<StudioDataModel>> GetAllAsync()
        {
            var result = await collection.Find(Builders<StudioDataModel>.Filter.Empty).ToListAsync();

            return result;
        }
    }

    [BsonIgnoreExtraElements]
    public class MovieDataModel
    {
        [BsonElement("movieId")]
        public string MovieId { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("year")]
        public int Year { get; set; }

        [BsonElement("duration")]
        public int Duration { get; set; }

        [BsonElement("director")]
        public string Director { get; set; }

        [BsonElement("imdb")]
        public ImdbRatingDataModel Imdb { get; set; }

        [BsonElement("cover")]
        public CoverDataModel Cover { get; set; }

        [BsonElement("availableIn")]
        public List<LanguageDataModel> AvailableIn { get; set; }

        [BsonElement("countries")]
        public List<CountryDataModel> Countries { get; set; }

        [BsonElement("studios")]
        public List<StudioDataModel> Studios { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreateAt { get; set; }

        [BsonElement("castMemberIds")]
        public List<string> CastMemberIds { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class StudioDataModel
    {
        [BsonElement("uId")]
        public string UId { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }


    [BsonIgnoreExtraElements]
    public class CountryDataModel
    {
        [BsonElement("code")]
        public string Code { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class LanguageDataModel
    {
        [BsonElement("code")]
        public string Code { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class CoverDataModel
    {
        [BsonElement("fileName")]
        public string FileName { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class ImdbRatingDataModel
    {
        [BsonElement("rating")]
        public decimal Rating { get; set; }

        [BsonElement("url")]
        public string Url { get; set; }
    }

    public class MovieSearchFilter
    {
        public string SearchValue { get; set; }

        public string[] AvailableIn { get; set; }

        public int[] Years { get; set; }

        public string[] Countries { get; set; }

        public string[] Studios { get; set; }

        public decimal? ImdbFrom { get; set; }

        public decimal? ImdbTo { get; set; }
    }
}
