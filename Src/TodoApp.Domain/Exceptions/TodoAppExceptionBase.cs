namespace TodoApp.Domain.Exceptions;


/// <summary>
/// Todo App Excption. All exception thrown by the application are children of this Exception.
/// </summary>
public class TodoAppExceptionBase : Exception
{
    public TodoAppExceptionBase(string msg):base(msg)
    {
        
    }

}