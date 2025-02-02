namespace server.Models.DTO;

public class AddGoalDTO
{
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required decimal Amount { get; set; }
}