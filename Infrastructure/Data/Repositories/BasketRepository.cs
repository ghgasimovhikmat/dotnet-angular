using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

public class BasketRepository : IBasketRepository
{
    private readonly IConnectionMultiplexer _connectionMultiplexer;

    public BasketRepository(IConnectionMultiplexer connectionMultiplexer)
    {
        _connectionMultiplexer = connectionMultiplexer ?? throw new ArgumentNullException(nameof(connectionMultiplexer));
    }

    public async Task<Basket> GetBasketAsync(string basketId)
    {
        var database = _connectionMultiplexer.GetDatabase();
        var basketData = await database.StringGetAsync(basketId);
        return basketData.IsNullOrEmpty ? null : JsonSerializer.Deserialize<Basket>(basketData);
    }

    public async Task<Basket> UpdateBasketAsync(Basket basket)
    {
        var database = _connectionMultiplexer.GetDatabase();
        await database.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket));
        return basket;
    }

    public async Task<bool> DeleteBasketAsync(string basketId)
    {
        var database = _connectionMultiplexer.GetDatabase();
        return await database.KeyDeleteAsync(basketId);
    }
}
