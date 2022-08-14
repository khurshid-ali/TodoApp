using TodoApp.Domain.Models;

namespace TodoApp.Domain.Interfaces;

/// <summary>
/// Interface describes the Todo Service
/// </summary>
public interface ITodoService
{
    /// <summary>
    /// GetAll todo items
    /// </summary>
    /// <returns></returns>
    Task<List<TodoItem>> GetAllAsync();

    /// <summary>
    /// Gets the item by id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task<TodoItem> GetByIdAsync(int id);

    /// <summary>
    /// Create a todo item
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    Task<TodoItem> CreateAsync(TodoItem item);

    /// <summary>
    /// Update a todo Item
    /// </summary>
    /// <param name="id"></param>
    /// <param name="updateFields"></param>
    /// <returns></returns>

    Task<TodoItem> UpdateAsync(int id, List<KeyValuePair<string,string>> updateFields);


    /// <summary>
    /// Delete a todo item
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    Task DeleteAsync(int id);
}