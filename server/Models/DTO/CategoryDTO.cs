namespace server.Models.DTO;
public class CategoryDTO
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
}

