namespace FIHS.Dtos
{
    public class GetAllPlantsParams
    {

        public int plantTypeId { get; set; }
        public int offset { get; set; } = 1;
        public int limit { get; set; } = 10;
        public int FavId { get; set; } = 0;
    }
}
