using System.Text.Json;

namespace TodoApp.Web.Exceptions;
public static class ExceptionExtension
{
    public static string ToJson(this Exception ex, int errorCode)
    {
        var erroDict = new Dictionary<string,object>();
        erroDict.Add("error", ex.Message);
        erroDict.Add("code", errorCode);

        return JsonSerializer.Serialize(erroDict);
    }
}