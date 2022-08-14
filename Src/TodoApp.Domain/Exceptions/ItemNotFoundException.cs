namespace TodoApp.Domain.Exceptions;

/// <summary>
/// Item not found exception
/// </summary>
public class ItemNotFoundException : TodoAppExceptionBase
{
    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="msg"></param>
    /// <returns></returns>
    public ItemNotFoundException(string msg) : base(msg)
    {
        
    }
}