using System;
using Xunit;
using Moq;
using Moq.EntityFrameworkCore;
using TodoApp.Domain.Models;
using TodoApp.Domain.Data;
using TodoApp.Domain.Services;
using TodoApp.Domain.Exceptions;
using Microsoft.EntityFrameworkCore;
namespace TodoApp.Domain.Tests;

public class TodoServiceTests
{
    private List<TodoItem> data = new List<TodoItem>(){
        new TodoItem(){
            Id=1,
            Description="Walk the dog.",
            IsComplete = false
        },
        new TodoItem(){
            Id=2,
            Description="Wash the car.",
            IsComplete = false
        },
        new TodoItem(){
            Id=3,
            Description="Mow the lawn.",
            IsComplete = false
        }
    };

    
    [Fact]
    public async Task TestGetAll()
    {        
        var dbContextMock = new Mock<TodoContext>();
        dbContextMock
            .Setup(x => x.TodoItems)
            .ReturnsDbSet(data);



        var service = new TodoService(dbContextMock.Object);
        var result = await service.GetAllAsync();

        Assert.NotEmpty(result);        

    }

    [Fact]
    public async Task TestGetById_when_id_found()
    {
        var dbContextMock = new Mock<TodoContext>();
        dbContextMock
            .Setup(x => x.TodoItems)
            .ReturnsDbSet(data);

        var service = new TodoService(dbContextMock.Object);
        var result = await service.GetByIdAsync(1);

        Assert.NotNull(result);

    }

    [Fact]
    public async Task TestGetById_when_id_Not_found_throws_not_found_exception()
    {
         var dbContextMock = new Mock<TodoContext>();
        dbContextMock
            .Setup(x => x.TodoItems)
            .ReturnsDbSet(data);

        var service = new TodoService(dbContextMock.Object);
        var exception = await Assert.ThrowsAsync<ItemNotFoundException>(() => service.GetByIdAsync(10)) ;

        Assert.NotNull(exception);
        Assert.True(exception.Message.StartsWith("Could not find item with"));
    }

    
    [Fact]
    public async Task DeleteAsync_When_Found_throws_ItemNotFoundException()
    {
         var dbContextMock = new Mock<TodoContext>();
        dbContextMock
            .Setup(x => x.TodoItems)
            .ReturnsDbSet(data);

        var service = new TodoService(dbContextMock.Object);
        var exception = await Assert.ThrowsAsync<ItemNotFoundException>(() => service.DeleteAsync(100));

        Assert.NotNull(exception);
        Assert.True(exception.Message.StartsWith("Could not find item with"));

    }

    [Fact]
    public async Task UpdateAsync_When_Found_throws_ItemNotFoundException()
    {
        var updateFields = new List<KeyValuePair<string,string>>(){
            new KeyValuePair<string, string>("Description", "testDescription")
        }; 

         var dbContextMock = new Mock<TodoContext>();
        dbContextMock
            .Setup(x => x.TodoItems)
            .ReturnsDbSet(data);

        var service = new TodoService(dbContextMock.Object);
        var exception = await Assert.ThrowsAsync<ItemNotFoundException>(() => service.UpdateAsync(100, updateFields));

        Assert.NotNull(exception);
        Assert.True(exception.Message.StartsWith("Could not find item with"));

    }

    [Fact]
    public async Task UpdateAsync_When_Found()
    {
        var updateFields = new List<KeyValuePair<string,string>>(){
            new KeyValuePair<string, string>("Description", "testDescription")
        }; 

        var dbContextMock = new Mock<TodoContext>();
        dbContextMock
            .Setup(x => x.TodoItems)
            .ReturnsDbSet(data);

        var service = new TodoService(dbContextMock.Object);
        var result = await service.UpdateAsync(1, updateFields);

        Assert.NotNull(result);
        Assert.Equal("testDescription", data.FirstOrDefault(x => x.Id ==1)?.Description);

    }
        
}

