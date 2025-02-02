using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using server.Models.DTO;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController(AppDbContext dbContext) : ControllerBase
{
    private readonly AppDbContext dbContext = dbContext;

    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categoriesDomain = await dbContext.Categories.ToListAsync();

        // Map domain models to DTO
        var categoriesDTO = new List<CategoryDTO>();
        foreach (var categoryDomain in categoriesDomain)
        {
            categoriesDTO.Add(new CategoryDTO()
            {
                Id = categoryDomain.Id,
                Name = categoryDomain.Name,
                Description = categoryDomain.Description,
            });
        }
        return Ok(categoriesDTO);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(Guid id)
    {
        var categoryDomain = await dbContext.Categories.FindAsync(id);

        if (categoryDomain == null) return NotFound();

        var categoryDTO = new CategoryDTO()
        {
            Id = categoryDomain.Id,
            Name = categoryDomain.Name,
            Description = categoryDomain.Description,
        };
        return Ok(categoryDTO);
    }

    [HttpPost]
    public async Task<IActionResult> PostCategory([FromBody] AddCategoryDTO categoryRequest)
    {
        var categoryDomainModel = new Category
        {
            Name = categoryRequest.Name,
            Description = categoryRequest.Description,
        };

        // Use domain model to create region
        await dbContext.Categories.AddAsync(categoryDomainModel);
        await dbContext.SaveChangesAsync();

        // Map domain model to DTO
        var categoryDTO = new CategoryDTO
        {
            Id = categoryDomainModel.Id,
            Name = categoryDomainModel.Name,
            Description = categoryDomainModel.Description,
        };

        return CreatedAtAction(
            nameof(GetCategory),
            new { id = categoryDTO.Id },
            categoryDTO
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(Guid id, AddCategoryDTO requestCategory)
    {
        // Find if goal exists
        var currentCategory = await dbContext.Categories.FirstOrDefaultAsync(g => g.Id == id);
        if (currentCategory == null) return NotFound("Category not found. Please send a valid Category ID.");

        currentCategory.Name = requestCategory.Name;
        currentCategory.Description = requestCategory.Description;

        await dbContext.SaveChangesAsync();

        return Ok(currentCategory);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        // Find if current category exists
        var currentCategory = await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        // Return not found if not found
        if (currentCategory == null) return NotFound();
        // Proceed to delete row and save changes
        dbContext.Categories.Remove(currentCategory);
        await dbContext.SaveChangesAsync();

        return Ok($"Category Id: {id} has been remove successfully.");
    }
}
