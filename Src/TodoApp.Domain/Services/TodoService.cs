using Microsoft.EntityFrameworkCore;
using TodoApp.Domain.Interfaces;
using TodoApp.Domain.Models;
using TodoApp.Domain.Data;
using TodoApp.Domain.Exceptions;

namespace TodoApp.Domain.Services;

/// <summary>
/// TodoService
/// </summary>
public class TodoService : ITodoService
{
    private TodoContext _dbContext;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="dbContext"></param>
    public TodoService(TodoContext dbContext)
    {
        _dbContext = dbContext;   
    }

    /// <summary>
    /// Get All
    /// </summary>
    /// <returns></returns>
    public async Task<List<TodoItem>> GetAllAsync()
    {
        return await _dbContext
            .TodoItems
            .OrderBy(item => item.IsComplete)
            .ThenBy(item => item.Id)
            .ToListAsync();
    }

    /// <summary>
    /// Get by Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<TodoItem> GetByIdAsync(int id)
    {
        var result = await _dbContext
            .TodoItems
            .FirstOrDefaultAsync(item => item.Id == id);

        if(result == null)
            throw new ItemNotFoundException($"Could not find item with id {id}");
        
        return result;
    }

    /// <summary>
    /// Create
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    public async Task<TodoItem> CreateAsync(TodoItem item)
    {
        var createdItem = await _dbContext.TodoItems.AddAsync(item);

        await _dbContext.SaveChangesAsync();

        return createdItem.Entity;
    }

    /// <summary>
    /// Delete
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task DeleteAsync(int id)
    {
        var entityToDelete = await _dbContext.TodoItems.FirstOrDefaultAsync(dbItem => dbItem.Id == id);
        if (entityToDelete == null)
            throw new ItemNotFoundException($"Could not find item with id {id}");

        _dbContext.TodoItems.Remove(entityToDelete);
        await _dbContext.SaveChangesAsync();
    }

    
    /// <summary>
    /// Update
    /// </summary>
    /// <param name="id"></param>
    /// <param name="updateFields"></param>
    /// <returns></returns>
    public async Task<TodoItem> UpdateAsync(int id, List<KeyValuePair<string, string>> updateFields)
    {
        var dbVersion = await _dbContext.TodoItems.FirstOrDefaultAsync(dbItem => dbItem.Id == id);

        if(dbVersion == null)
            throw new ItemNotFoundException($"Could not find item with id {id}");
        
        foreach(var field in updateFields)
        {
            var propInfo = dbVersion.GetType().GetProperty(field.Key);
            if (propInfo != null) 
                propInfo.SetValue(dbVersion, Convert.ChangeType(field.Value, propInfo.PropertyType));
        }

        await _dbContext.SaveChangesAsync();        
        return dbVersion;
    }
}
