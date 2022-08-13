using System.Text.Json;

namespace TodoApp.Web.Exceptions;

public class TodoAppExceptionBase : Exception
{
    public TodoAppExceptionBase(string msg):base(msg)
    {
        
    }

}