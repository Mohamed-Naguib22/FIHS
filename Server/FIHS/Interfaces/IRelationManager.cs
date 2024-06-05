namespace FIHS.Interfaces
{
    public interface IRelationManager

    {
        void AddRelation<MToMRelationModel, FirstEntity, SecondEntity>(int firstId, int secondId) where MToMRelationModel : class, new() where FirstEntity : class where SecondEntity : class;
    }
}
