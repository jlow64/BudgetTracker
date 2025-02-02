using System.ComponentModel.DataAnnotations;

namespace server.Models;
public class Category
{
    [Key]
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    // Relationship
    public ICollection<Transaction> Transactions { get; } = [];
}
