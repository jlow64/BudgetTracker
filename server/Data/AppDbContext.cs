using Microsoft.EntityFrameworkCore;
using server.Data.Enums;
using server.Models;

namespace server.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
        .UseSeeding((context, _) =>
    {
        var categories = new List<Category>()
        {
            new()
            {
                Name = "Monthly Expenses",
                Description = "Tracking monthly spending",
            },
            new()
            {
                Name = "Salary",
                Description = "Income salary",
            }
        };
        var mockCategories = context.Set<Category>().FirstOrDefault(c => c.Name == "Name");
        if (mockCategories == null)
        {
            context.Set<Category>().AddRange(categories);
            context.SaveChanges();
        }
        var mockGoal = context.Set<Goal>().FirstOrDefault(g => g.Name == "Name");
        if (mockGoal == null)
        {
            context.Set<Goal>().AddRange(
                 new Goal()
                 {
                     Name = "House Deposit",
                     Description = "For the first house!",
                     Amount = 10000.00M
                 },
                new Goal()
                {
                    Name = "Dream PC",
                    Description = "For the BEST PC",
                    Amount = 20000.00M
                },
                new Goal()
                {

                    Name = "Wedding",
                    Description = "*incoming wedding music*",
                    Amount = 20000.00M
                }
            );
            context.SaveChanges();
        }
        var mockTransaction = context.Set<Transaction>().FirstOrDefault(t => t.Name == "Name");
        if (mockTransaction == null)
        {
            context.Set<Transaction>().AddRange(
                new()
                {
                    Name = "Salary",
                    Description = "Monthly automatic payment",
                    Amount = 5000.00M,
                    TimeStamp = DateTime.Now,
                    Type = TransactionType.Income,
                    Category = categories[1]
                },
                new()
                {
                    Name = "Countdown",
                    Description = "Monthy groceries",
                    Amount = 50.00M,
                    TimeStamp = DateTime.Now,
                    Type = TransactionType.Expense,
                    Category = categories[0]
                }
            );
            context.SaveChanges();
        }
    });
    public DbSet<Transaction> Transactions { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<Goal> Goals { get; set; }
}