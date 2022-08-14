
namespace TodoApp.Domain.Models
{
    /// <summary>
    /// Todo Item Model
    /// </summary>
    public class TodoItem
    {
        /// <summary>
        /// Id of the todo Item
        /// </summary>
        /// <value></value>
        public int Id { get; set; }

        /// <summary>
        /// Description of the todo item
        /// </summary>
        /// <value></value>
        public string Description { get; set; } = null!;

        /// <summary>
        /// if the item is complete or not.
        /// </summary>
        /// <value></value>
        public bool IsComplete { get; set; }


    }
}