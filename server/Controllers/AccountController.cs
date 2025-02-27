// This controller should only allow post and get requests

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTO;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController(AppDbContext dbContext) : ControllerBase
{
    private readonly AppDbContext dbContext = dbContext;

    [HttpGet]
    public async Task<IActionResult> GetAllAccounts()
    {
        var accountsDomain = await dbContext.Accounts.ToListAsync();

        // Map domain models to DTO
        var accountsDTO = new List<AccountDTO>();
        foreach (var accountDomain in accountsDomain)
        {
            accountsDTO.Add(new AccountDTO()
            {
                Id = accountDomain.Id,
                UserId = accountDomain.UserId
            });
        }
        return Ok(accountsDTO);
    }

    [HttpGet("{UserId}")]
    public async Task<IActionResult> GetAccount(string UserId)
    {
        var accountDomain = await dbContext.Accounts.FirstOrDefaultAsync(a => a.UserId == UserId);

        if (accountDomain == null) return NotFound();

        var accountDTO = new AccountDTO()
        {
            Id = accountDomain.Id,
            UserId = accountDomain.UserId,
        };
        return Ok(accountDTO);
    }

    [HttpPost]
    public async Task<IActionResult> PostAccount([FromBody] AddAccountDTO accountRequest)
    {
        var accountDomainModel = new Account
        {
            UserId = accountRequest.UserId,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        // Use domain model to create region
        await dbContext.Accounts.AddAsync(accountDomainModel);
        await dbContext.SaveChangesAsync();

        // Map domain model to DTO
        var accountDTO = new AccountDTO
        {
            Id = accountDomainModel.Id,
            UserId = accountDomainModel.UserId,
        };

        return CreatedAtAction(
            nameof(GetAccount),
            new { id = accountDTO.Id },
            accountDTO
        );
    }
}
