using Microsoft.AspNetCore.Mvc;
using TodoApp.Domain.Models;
using TodoApp.Domain.Interfaces;

namespace TodoApp.Web.Controllers;


/// <summary>
/// Todo Controller
/// url: /todo
/// </summary>
[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    //private TodoContext _dbContext;
    private ITodoService _todoService;
    
    public TodoController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    /// <summary>
    /// GetAll 
    /// Returns all todo items in the db
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    public async Task<IEnumerable<TodoItem>> GetAllAsync()
    {
        return await _todoService.GetAllAsync();
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
       return await _todoService.GetByIdAsync(id);

    }


    /// <summary>
    /// Create a TodoItem
    /// </summary>
    /// <param name="item"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<TodoItem> CreateItemAsync([FromBody] TodoItem item)
    {
        return await _todoService.CreateAsync(item);
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
        return await _todoService.UpdateAsync(id, modifiedFields);

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
        await _todoService.DeleteAsync(id);

    }

}