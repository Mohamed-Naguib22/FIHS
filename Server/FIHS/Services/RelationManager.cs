using FIHS.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FIHS.Services
{
    public class RelationManager : IRelationManager
    {
        private readonly ApplicationDbContext _context;
        public RelationManager(ApplicationDbContext context)
        {
            _context = context;

        }

        public void AddRelation<MToMRelationModel, FirstEntity, SecondEntity>(int firstId, int secondId) where MToMRelationModel : class, new() where FirstEntity : class where SecondEntity : class
        {
            var relation = new MToMRelationModel();
            var firstProperty = typeof(MToMRelationModel).GetProperty($"{typeof(FirstEntity).Name}Id");
            var secondProperty = typeof(MToMRelationModel).GetProperty($"{typeof(SecondEntity).Name}Id");

            if (firstProperty == null || secondProperty == null)
            {
                throw new InvalidOperationException("حدث خطأ");
            }

            firstProperty.SetValue(relation, firstId);
            secondProperty.SetValue(relation, secondId);
            try
            {
                _context.Set<MToMRelationModel>().Add(relation);
                _context.SaveChanges();
            } catch (Exception ex) {
                return;
            }
        }
    }
}
