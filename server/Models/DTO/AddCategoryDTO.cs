using server.Data.Enums;

namespace server.Models.DTO;
public class AddCategoryDTO
{
    public required string Name { get; set; }
    public required TransactionType Type { get; set; }
    public required string UserId { get; set; }
}

