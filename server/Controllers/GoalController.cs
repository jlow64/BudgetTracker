using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTO;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GoalController(AppDbContext dbContext) : ControllerBase
{
    private readonly AppDbContext dbContext = dbContext;

    [HttpGet]
    public async Task<IActionResult> GetGoals()
    {
        // Get domain data from db
        var goalsDomain = await dbContext.Goals.ToListAsync();

        // Map domain models to DTO
        var goalsDTO = new List<GoalDTO>();
        foreach (var goalDomain in goalsDomain)
        {
            goalsDTO.Add(new GoalDTO()
            {
                Id = goalDomain.Id,
                Name = goalDomain.Name,
                Description = goalDomain.Description,
                Amount = goalDomain.Amount
            });
        }
        return Ok(goalsDTO);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGoal(Guid id)
    {
        // Get goal domain data from DB
        var goalDomain = await dbContext.Goals.FindAsync(id);

        // Check if requested GoalId is a hit
        if (goalDomain == null) return NotFound();

        // Map domain to DTO
        var goalDTO = new GoalDTO()
        {
            Id = goalDomain.Id,
            Name = goalDomain.Name,
            Description = goalDomain.Description,
            Amount = goalDomain.Amount
        };
        return Ok(goalDTO);
    }

    [HttpPost]
    public async Task<IActionResult> PostGoal([FromBody] AddGoalDTO requestGoal)
    {
        // Map request info into Domain model
        var goalDomainModel = new Goal
        {
            Name = requestGoal.Name,
            Description = requestGoal.Description,
            Amount = requestGoal.Amount,
        };

        // Add model to db
        await dbContext.Goals.AddAsync(goalDomainModel);
        await dbContext.SaveChangesAsync();

        // Map domain model to DTO
        var goalDTO = new GoalDTO
        {
            Id = goalDomainModel.Id,
            Name = goalDomainModel.Name,
            Description = goalDomainModel.Description,
            Amount = goalDomainModel.Amount
        };

        return CreatedAtAction(
            nameof(GetGoal),
            new { id = goalDTO.Id },
            goalDTO
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGoal(Guid id, AddGoalDTO requestGoal)
    {
        // Find if goal exists
        var currentGoal = await dbContext.Goals.FirstOrDefaultAsync(g => g.Id == id);
        if (currentGoal == null) return NotFound("Goal not found. Please send a valid goal ID.");

        currentGoal.Name = requestGoal.Name;
        currentGoal.Description = requestGoal.Description;
        currentGoal.Amount = requestGoal.Amount;

        await dbContext.SaveChangesAsync();

        return Ok(currentGoal);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGoal(Guid id)
    {
        // Find if current goal exists
        var currentGoal = await dbContext.Goals.FirstOrDefaultAsync(g => g.Id == id);
        // Return not found if not found
        if (currentGoal == null) return NotFound();
        // Proceed to delete row and save changes
        dbContext.Goals.Remove(currentGoal);
        await dbContext.SaveChangesAsync();

        return Ok($"Goal Id: {id} has been remove successfully.");
    }
}
