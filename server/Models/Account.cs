namespace server.Models;
public class Account
{
    public Guid Id { get; set; }
    public required string UserId { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime UpdatedAt { get; set; }
    // Relationship
    public ICollection<Transaction> Transactions { get; } = [];
}
