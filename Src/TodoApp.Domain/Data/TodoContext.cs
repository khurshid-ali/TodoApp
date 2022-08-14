using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Models;
using TodoApp.Domain.Interfaces;

namespace TodoApp.Domain.Data
{
    /// <summary>
    /// Todo Databaes context.
    /// </summary>
    public class TodoContext : DbContext
    {
        /// <summary>
        /// TodoItems DBSet
        /// </summary>
        /// <value></value>
        public virtual DbSet<TodoItem> TodoItems {get;set;} = null!;

    
        /// <summary>
        /// 
        /// </summary>
        /// <param name="options"></param>
        public TodoContext(DbContextOptions<TodoContext> options):base(options)
        {
            
        }

        /// <summary>
        /// For testing
        /// </summary>
        public TodoContext()
        {
            
        }
    }
}