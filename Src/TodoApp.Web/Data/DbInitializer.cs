using TodoApp.Web.Models;

namespace TodoApp.Web.Data;

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
            Description ="test item 1"
        });

        items.Add(new TodoItem(){
            Description ="test item 2"
        });


        context.TodoItems.AddRange(items);
        context.SaveChanges();
    }
}