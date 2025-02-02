using server.Data.Enums;

namespace server.Models.DTO;

public class TransactionDTO
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required DateTime TimeStamp { get; set; }
    public required decimal Amount { get; set; }
    public required TransactionType Type { get; set; }

    // Relationships 
    public required string Category { get; set; }

}