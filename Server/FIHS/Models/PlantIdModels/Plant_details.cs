namespace FIHS.Models.PlantIdentification
{
    public class Plant_details
    {
        public List<string> Common_names { get; set; }
        public Wiki_description Wiki_description { get; set; }
        public Wiki_image Wiki_image { get; set; }
        public string Scientific_name { get; set; }
    }
}
