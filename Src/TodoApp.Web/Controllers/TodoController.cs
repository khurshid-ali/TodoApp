using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Web.Data;
using TodoApp.Web.Models;
using TodoApp.Domain.Exceptions;

namespace TodoApp.Web.Controllers;


/// <summary>
/// Todo Controller
/// url: /todo
/// </summary>
[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    private TodoContext _dbContext;
    public TodoController(TodoContext dbContext)
    {
        _dbContext = dbContext;
    }

    /// <summary>
    /// GetAll 
    /// Returns all todo items in the db
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<IEnumerable<TodoItem>> GetAllAsync()
    {
        return await _dbContext
            .TodoItems
            .OrderBy(item => item.IsComplete)
            .ThenBy(item => item.Id)
            .ToListAsync();
    }


    /// <summary>
    /// Get by id method 
    /// returns the todo item by the id
    /// Throws ItemNotFoundException
    /// </summary>
    /// <param name="id">id of the todo item</param>
    /// <returns>TodoItem</returns>
    [HttpGet]
    [Route("{id}")]
    public async Task<TodoItem> GetItemAsync(int id)
    {
        var result = await _dbContext
            .TodoItems
            .FirstOrDefaultAsync(item => item.Id == id);

        if(result == null)
            throw new ItemNotFoundException($"Could not find item with id {id}");
        
        return result;

    }


    /// <summary>
    /// Create a TodoItem
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<TodoItem> CreateItemAsync([FromBody] TodoItem item)
    {
        var createdItem = await _dbContext.TodoItems.AddAsync(item);

        await _dbContext.SaveChangesAsync();

        return createdItem.Entity;
    }

    /// <summary>
    /// Update a TodoItem
    /// </summary>
    /// <param name="id"></param>
    /// <param name="modifiedFields"></param>
    /// <returns></returns>
    [HttpPatch]
    [Route("{id}")]
    public async Task<TodoItem> UpdateItem(int id, [FromBody] List<KeyValuePair<string,string>> modifiedFields)
    {  
        var dbVersion = await _dbContext.TodoItems.FirstOrDefaultAsync(dbItem => dbItem.Id == id);

        if(dbVersion == null)
            throw new ItemNotFoundException($"Could not find item with id {id}");
        
        foreach(var field in modifiedFields)
        {
            var propInfo = dbVersion.GetType().GetProperty(field.Key);
            if (propInfo != null) 
                propInfo.SetValue(dbVersion, Convert.ChangeType(field.Value, propInfo.PropertyType));
        }

        await _dbContext.SaveChangesAsync();        
        return dbVersion;

    }



    /// <summary>
    /// Deletes the todo item by id. 
    /// Throws ItemNotFoundException if item by id is not found.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpDelete]
    [Route("{id}")]
    public async Task DeleteAsync(int id)
    {
        var entityToDelete = await _dbContext.TodoItems.FirstOrDefaultAsync(dbItem => dbItem.Id == id);
        if (entityToDelete == null)
            throw new ItemNotFoundException($"Could not find item with id {id}");

        _dbContext.Entry(entityToDelete).State = EntityState.Deleted;
        await _dbContext.SaveChangesAsync();
    }

}