using FIHS.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace FIHS.Services;

public class CacheService : ICacheService
{
    private readonly IMemoryCache _memoryCache;

    public CacheService(IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
    }

    public T Get<T>(string key)
    {
        return _memoryCache.Get<T>(key);
    }

    public void Set<T>(string key, T value, TimeSpan expirationTime)
    {
        _memoryCache.Set(key, value, expirationTime);
    }

    public void Remove(string key)
    {
        _memoryCache.Remove(key);
    }

    public bool TryGetValue<T>(string key, out T value)
    {
        if (_memoryCache.TryGetValue(key, out object cacheValue))
        {
            if (cacheValue is T)
            {
                value = (T)cacheValue;
                return true;
            }
        }

        value = default;
        return false;
    }

}
