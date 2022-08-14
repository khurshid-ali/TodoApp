using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Models;

namespace TodoApp.Web.Data
{
    public class TodoContext : DbContext 
    {
        public DbSet<TodoItem> TodoItems {get;set;} = null!;

        public TodoContext(DbContextOptions<TodoContext> options):base(options)
        {
            
        }
    }
}