

namespace TodoApp.Domain.Models
{
    public class TodoItem
    {
        
        public int Id { get; set; }

        public string Description { get; set; } = null!;

        public bool IsComplete { get; set; }


    }
}