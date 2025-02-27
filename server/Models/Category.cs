using server.Data.Enums;

namespace server.Models;
public class Category
{
    public Guid Id { get; set; }
    public required string UserId { get; set; }
    public required string Name { get; set; }
    public required TransactionType Type { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime UpdatedAt { get; set; }
    // Relationship
    public ICollection<Transaction> Transactions { get; } = [];
}
