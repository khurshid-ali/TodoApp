using TodoApp.Domain.Models;

namespace TodoApp.Domain.Data;

/// <summary>
/// Data base initializer. 
/// Initialized the data base with 3 todo items.
/// </summary>
public static class DbInitializer
{
    public static void Initialize(TodoContext context)
    {
        context.Database.EnsureCreated();

        if (context.TodoItems.Any())
        {
            return;
        }

        var items = new List<TodoItem>();
        items.Add(new TodoItem(){
            Description ="Mow the lawn."
        });

        items.Add(new TodoItem(){
            Description ="Walk the dog."
        });

        items.Add(new TodoItem(){
            Description ="Wash the car."
        });


        context.TodoItems.AddRange(items);
        context.SaveChanges();
    }
}