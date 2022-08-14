using System.Net;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Data;
using TodoApp.Domain.Exceptions;
using TodoApp.Domain.Interfaces;
using TodoApp.Domain.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Register the dbContext
builder.Services.AddDbContext<TodoContext>(options => {
    options.UseSqlite($"Data Source={Path.Join(Environment.CurrentDirectory, "todo-app.db")}", b => b.MigrationsAssembly("TodoApp.Web"));
});

//Register the TodoService
builder.Services.AddScoped<ITodoService, TodoService>();

builder.Services.AddControllersWithViews();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//Exception Handler middleware
app.Use( 
    async (context, next) => 
    {
        try 
        {
            await next.Invoke();

        }
        catch (ItemNotFoundException notFoundExc)
        {
            var code = (int) HttpStatusCode.NotFound;
            context.Response.StatusCode = code;
            await context.Response.WriteAsync(notFoundExc.ToJson(code));

        }
        catch (Exception ex) when (!(ex is TodoAppExceptionBase ))
        {
            int code = (int) HttpStatusCode.InternalServerError;
            context.Response.StatusCode = code;            
            await context.Response.WriteAsync(ex.ToJson(code));
        }
        
    }
);

//ensure database is created with initialized data.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<TodoContext>();
    context.Database.EnsureCreated();
    DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
