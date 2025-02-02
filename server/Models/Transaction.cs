using System.ComponentModel.DataAnnotations;
using server.Data.Enums;

namespace server.Models;

public class Transaction
{
    [Key]
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required DateTime TimeStamp { get; set; }
    public required decimal Amount { get; set; }
    public required TransactionType Type { get; set; }

    // Relationships 
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;

}

