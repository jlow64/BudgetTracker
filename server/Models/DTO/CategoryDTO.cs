using server.Data.Enums;

namespace server.Models.DTO;
public class CategoryDTO
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required TransactionType Type { get; set; }
    public required string UserId { get; set; }
}

