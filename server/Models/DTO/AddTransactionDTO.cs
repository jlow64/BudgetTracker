using server.Data.Enums;

namespace server.Models.DTO;

public class AddTransactionDTO
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required decimal Amount { get; set; }
    public required DateTime Date { get; set; }
    public required TransactionType Type { get; set; }
    public required Guid AccountId { get; set; }
    public required Guid CategoryId { get; set; }
}