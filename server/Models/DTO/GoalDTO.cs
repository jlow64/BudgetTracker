namespace server.Models.DTO;
public class GoalDTO
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required decimal Amount { get; set; }
}
