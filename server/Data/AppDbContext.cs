using Microsoft.EntityFrameworkCore;
using server.Data.Enums;
using server.Models;

namespace server.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<Account>().HasMany(a => a.Categories).WithOne().HasForeignKey(c => c.);
        modelBuilder.Entity<Account>().HasMany(a => a.Transactions).WithOne().IsRequired();

        modelBuilder.Entity<Category>().HasMany(c => c.Transactions).WithOne().IsRequired();
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
        .UseSeeding((context, _) =>
    {
        var account = new Account()
        {
            UserId = "auth0|67ba4d8db76dd82863529b8d",
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now,
        };
        var mockAccount = context.Set<Account>().FirstOrDefault(a => a.UserId == "test");
        if (mockAccount == null)
        {
            context.Set<Account>().Add(account);
            context.SaveChanges();
        }
        var categories = new List<Category>()
        {
            new()
            {
                Name = "Monthly",
                UserId = account.UserId,
                Type = TransactionType.Expense,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            },
            new()
            {
                Name = "Salary",
                UserId = account.UserId,
                Type = TransactionType.Income,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            }
        };
        var mockCategories = context.Set<Category>().FirstOrDefault(c => c.Name == "Name");
        if (mockCategories == null)
        {
            context.Set<Category>().AddRange(categories);
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
                    Date = DateTime.Now,
                    Type = TransactionType.Income,
                    CategoryId = categories[1].Id,
                    AccountId = account.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                },
                new()
                {
                    Name = "Countdown",
                    Description = "Monthy groceries",
                    Amount = 50.00M,
                    Date = DateTime.Now,
                    Type = TransactionType.Expense,
                    CategoryId = categories[0].Id,
                    AccountId = account.Id,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                }
            );
            context.SaveChanges();
        }
    });

    public DbSet<Account> Accounts { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    public DbSet<Category> Categories { get; set; }

}