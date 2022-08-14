namespace TodoApp.Domain.Exceptions;

public class ItemNotFoundException : TodoAppExceptionBase
{
    public ItemNotFoundException(string msg) : base(msg)
    {
        
    }
}