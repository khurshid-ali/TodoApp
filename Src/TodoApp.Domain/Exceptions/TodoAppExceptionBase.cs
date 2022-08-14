namespace TodoApp.Domain.Exceptions;

public class TodoAppExceptionBase : Exception
{
    public TodoAppExceptionBase(string msg):base(msg)
    {
        
    }

}