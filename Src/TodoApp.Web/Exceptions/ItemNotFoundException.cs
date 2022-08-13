using System;

namespace TodoApp.Web.Exceptions;
public class ItemNotFoundException : TodoAppExceptionBase
{
    public ItemNotFoundException(string msg) : base(msg)
    {
        
    }
}
