using FIHS.Interfaces;
using FIHS.Models.Fertilizer;
using FIHS.Models.FertilizerModels;
using FIHS.Models.PestModels;
using FIHS.Models.PlantModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FIHS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelationManagerController : ControllerBase
    {
        private readonly IRelationManager _relationManager;
        public RelationManagerController(IRelationManager relationManager)
        {
            _relationManager = relationManager;
        }
        [HttpPost("AddPlantSoilRelation")]
        public IActionResult AddPlantSoilRelation(int plantId , int soildId)
        {
            _relationManager.AddRelation<PlantSoilTypes,Plant,Soil>(plantId, soildId);
            return(Ok("Done"));
        }
        [HttpPost("AddPlantTypeRelation")]
        public IActionResult AddPlantTypeRelation(int plantId, int plantTypeId)
        {
            _relationManager.AddRelation<PlantsTypesOfPlant, Plant, PlantType>(plantId, plantTypeId);
            return (Ok("Done"));
        }
        [HttpPost("AddPlantPestRelation")]
        public IActionResult AddPlantPestRelation(int plantId, int pestId)
        {
            _relationManager.AddRelation<PlantsPests, Plant, Pest>(plantId, pestId);
            return (Ok("Done"));
        }
        [HttpPost("AddPlantFertilizerRelation")]
        public IActionResult AddPlantFertilizerRelation(int plantId, int fertlizerId)
        {
            _relationManager.AddRelation<PlantFertilizer, Plant, Fertilizer>(plantId, fertlizerId);
            return (Ok("Done"));
        }
    }
}
