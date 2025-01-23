using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TransactionController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTransaction()
    {
        var products = new[]
        {
                new { Id = 1, Name = "Laptop", Price = 1200 },
                new { Id = 2, Name = "Phone", Price = 800 },
                new { Id = 3, Name = "Tablet", Price = 600 }
            };
        return Ok(products);
    }
}
