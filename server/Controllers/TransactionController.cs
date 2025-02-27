using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTO;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransactionController(AppDbContext dbContext) : ControllerBase
{
    private readonly AppDbContext dbContext = dbContext;

    [HttpGet]
    public async Task<IActionResult> GetTransactions(string UserId, Guid AccountId)
    {
        // Get domain data from database
        var transactionsDomain = await dbContext.Transactions.ToListAsync();
        var categoriesDomain = await dbContext.Categories.Where(c => c.UserId == UserId).ToListAsync();

        // Check if query is a hit
        if (transactionsDomain == null || categoriesDomain == null) return NotFound();

        // Map domain models to DTO
        var transactionsDTO = new List<TransactionDTO>();
        foreach (var transactionDomain in transactionsDomain)
        {
            // Query Category based on transaction Id
            var findCategory = categoriesDomain.FirstOrDefault(
                category => category.Transactions.Any(t => t.Id == transactionDomain.Id));
            transactionsDTO.Add(new TransactionDTO()
            {
                Id = transactionDomain.Id,
                Name = transactionDomain.Name,
                Description = transactionDomain.Description,
                Date = transactionDomain.Date,
                Amount = transactionDomain.Amount,
                Type = transactionDomain.Type,
                // If queried category doesn't have a name, for now default is N/A
                Category = findCategory?.Name ?? "N/A"
            });
        }
        return Ok(transactionsDTO);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTransaction(Guid id)
    {
        // Retrieve domain data from db
        var transactionDomain = await dbContext.Transactions
            .FirstOrDefaultAsync(t => t.Id == id);
        var categoryDomain = await dbContext.Categories
            .FirstOrDefaultAsync(c => c.Transactions.Any(t => t.Id == id));

        // Check if query is a hit
        if (transactionDomain == null || categoryDomain == null) return NotFound();

        // Map domain model to transaction DTO
        var transactionDTO = new TransactionDTO()
        {
            Id = transactionDomain.Id,
            Name = transactionDomain.Name,
            Description = transactionDomain.Description,
            Date = transactionDomain.Date,
            Amount = transactionDomain.Amount,
            Type = transactionDomain.Type,
            Category = categoryDomain.Name
        };

        return Ok(transactionDTO);
    }

    [HttpPost]
    public async Task<IActionResult> PostTransaction([FromBody] AddTransactionDTO transactionRequest)
    {
        // Retrieve category in DB from id
        var categoryFromId = await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == transactionRequest.CategoryId);
        // Check if requested category is valid
        if (categoryFromId == null) return BadRequest("Invalid Transaction");

        // Map request to Domain model
        var transactionDomainModel = new Transaction
        {
            Name = transactionRequest.Name,
            Description = transactionRequest.Description,
            Date = DateTime.Now,
            Amount = transactionRequest.Amount,
            Type = transactionRequest.Type,
            AccountId = transactionRequest.AccountId,
            CategoryId = transactionRequest.CategoryId,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        };

        // Add domain model to DB
        await dbContext.Transactions.AddAsync(transactionDomainModel);
        await dbContext.SaveChangesAsync();

        // Map domain model to DTO
        var transactionDTO = new TransactionDTO
        {
            Id = transactionDomainModel.Id,
            Name = transactionDomainModel.Name,
            Description = transactionDomainModel.Description,
            Date = transactionDomainModel.Date,
            Amount = transactionDomainModel.Amount,
            Type = transactionDomainModel.Type,
            Category = categoryFromId.Name
        };

        return CreatedAtAction(
            nameof(GetTransaction),
            new { id = transactionDTO.Id },
            transactionDTO
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTransaction(Guid id, AddTransactionDTO requestTransaction)
    {
        // Find if goal exists
        var currentTransaction = await dbContext.Transactions.FirstOrDefaultAsync(g => g.Id == id);
        if (currentTransaction == null) return NotFound("Transaction not found. Please send a valid Transaction ID.");

        currentTransaction.Name = requestTransaction.Name;
        currentTransaction.Description = requestTransaction.Description;
        currentTransaction.Amount = requestTransaction.Amount;
        currentTransaction.Date = requestTransaction.Date;
        currentTransaction.Type = requestTransaction.Type;
        currentTransaction.AccountId = requestTransaction.AccountId;
        currentTransaction.CategoryId = requestTransaction.CategoryId;
        currentTransaction.UpdatedAt = DateTime.Now;

        await dbContext.SaveChangesAsync();

        return Ok(currentTransaction);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTransaction(Guid id)
    {
        // Find if current transaction exists
        var currentTransaction = await dbContext.Transactions.FirstOrDefaultAsync(g => g.Id == id);
        // Return not found if not found
        if (currentTransaction == null) return NotFound();
        // Proceed to delete row and save changes
        dbContext.Transactions.Remove(currentTransaction);
        await dbContext.SaveChangesAsync();

        return Ok($"Transaction Id: {id} has been remove successfully.");
    }
}
