using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver.Linq;
using Microsoft.AspNetCore.StaticFiles;

namespace api.Controllers
{
    [ApiController]
    [Route("cast_members")]
    public class CastController : ControllerBase
    {
        private readonly ICastRepository repository;
        private readonly IMovieRepository movieRepository;

        public CastController(ICastRepository repository, IMovieRepository movieRepository)
        {
            this.repository = repository;
            this.movieRepository = movieRepository;
        }

        [HttpGet]
        public async Task<IActionResult> SearchAsync([FromQuery(Name = "searchValue")] string searchValue)
        {
            var result = await repository.SearchAsync(searchValue);

            return Ok(result);
        }


        [HttpGet("{movieId}")]
        public async Task<IActionResult> GetListAsync(string movieId)
        {
            var movie = await movieRepository.GetAsync(movieId);
            if (movie == null)
            {
                return BadRequest("Movie not found");
            }

            var result = await repository.GetListAsync(movie.CastMemberIds);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddNewAsync([FromBody] CastMemberDataModel dataModel)
        {
            var result = await repository.CreateAsync(dataModel);

            return result.Ok ? (IActionResult)Ok(result) : BadRequest(result.Message);
        }

        [HttpPost("{movieId}")]
        public async Task<IActionResult> AddToMovieAsync(string movieId, [FromBody] List<string> castMemberIds)
        {
            if (!await repository.CheckAllExists(castMemberIds))
            {
                return BadRequest("Not All Cast members Exists");
            }

            var result = await movieRepository.AddCastMembersAsync(movieId, castMemberIds);

            return result.Ok ? (IActionResult)Ok(result) : BadRequest(result.Message);
        }

        [HttpDelete("{movieId}/{castMemberId}")]
        public async Task<IActionResult> AddToMovieAsync(string movieId, string castMemberId)
        {
            if (!await repository.CheckAllExists(new List<string>() { castMemberId }))
            {
                return BadRequest("Not All Cast members Exists");
            }

            var result = await movieRepository.RemoveCastMemberAsync(movieId, castMemberId);

            return result.Ok ? (IActionResult)Ok(result) : BadRequest(result.Message);
        }
    }

    public interface ICastRepository
    {
        Task<bool> CheckAllExists(List<string> castMemberIds);
        Task<Result> CreateAsync(CastMemberDataModel dataModel);
        Task<List<CastMemberDataModel>> GetListAsync(List<string> castMemberIds);
        Task<List<CastMemberDataModel>> SearchAsync(string searchValue);
    }

    public class CastRepository : ICastRepository
    {
        private IMongoCollection<CastMemberDataModel> collection;
        private readonly IMovieRepository movieRepository;

        public CastRepository(IMovieRepository movieRepository)
        {
            collection = MongoDbConnectionFactory.GetCollection<CastMemberDataModel>("cast_members");
            this.movieRepository = movieRepository;
        }

        public async Task<List<CastMemberDataModel>> SearchAsync(string searchValue)
        {
            if (string.IsNullOrWhiteSpace(searchValue))
            {
                return await collection.AsQueryable().Take(10).ToListAsync();
            }

            return await collection
                .AsQueryable()
                .Where
                (
                    doc =>
                    doc.FirstName.Contains(searchValue) ||
                    doc.LastName.Contains(searchValue)
                ).ToListAsync();
        }

        public async Task<Result> CreateAsync(CastMemberDataModel dataModel)
        {
            if (!string.IsNullOrWhiteSpace(dataModel.CastId))
            {
                return new Result(false, "CastId should not be provided during creation");
            }

            dataModel.CastId = Convert.ToString(Guid.NewGuid());
            dataModel.CreateAt = DateTime.UtcNow;

            await collection.InsertOneAsync(dataModel);

            return new Result(true) { Data = dataModel };
        }

        public async Task<bool> CheckAllExists(List<string> castMemberIds)
        {
            var count = await collection.AsQueryable().CountAsync(doc => castMemberIds.Contains(doc.CastId));

            return count == castMemberIds.Count;
        }

        public async Task<List<CastMemberDataModel>> GetListAsync(List<string> castMemberIds)
        {
            var castMembers = await collection
                   .AsQueryable()
                   .Where
                   (
                       doc => castMemberIds.Contains(doc.CastId)
                   ).ToListAsync();

            return castMemberIds.Select(id => castMembers.FirstOrDefault(c => c.CastId == id)).ToList();
        }
    }

    [BsonIgnoreExtraElements]
    public class CastMemberDataModel
    {
        [BsonElement("castId")]
        public string CastId { get; set; }

        [BsonElement("firstName")]
        public string FirstName { get; set; }

        [BsonElement("lastName")]
        public string LastName { get; set; }

        [BsonElement("birthDate")]
        public DateTime BirthDate { get; set; }

        [BsonElement("height")]
        public decimal Height { get; set; }

        [BsonElement("photo")]
        public FileDataModel Photo { get; set; }

        [BsonElement("createdAt")]
        public DateTime CreateAt { get; set; }
    }

    [BsonIgnoreExtraElements]
    public class FileDataModel
    {
        [BsonElement("fileName")]
        public string FileName { get; set; }
    }
}
