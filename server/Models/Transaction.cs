using server.Data.Enums;

namespace server.Models;

public class Transaction
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required DateTime Date { get; set; }
    public required decimal Amount { get; set; }
    public required TransactionType Type { get; set; }
    public required DateTime CreatedAt { get; set; }
    public required DateTime UpdatedAt { get; set; }

    // Relationships 
    public Guid AccountId { get; set; } // Foreign Key
    public Guid CategoryId { get; set; } // Foreign Key

}

