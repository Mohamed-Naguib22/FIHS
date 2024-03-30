namespace FIHS.Extensions;

public static class PaginationExtension
{
    public static IEnumerable<T> Paginate<T>(this IEnumerable<T> source, int offset, int limit) where T : class
    {
        if (offset <= 0)
            offset = 1;

        if (limit <= 0)
            limit = 10;

        var total = source.Count();

        var numberOFPages = (int)Math.Ceiling((decimal)total / limit);

        var result = source.Skip((offset - 1) * limit).Take(limit).ToList();

        return result;
    }
}

