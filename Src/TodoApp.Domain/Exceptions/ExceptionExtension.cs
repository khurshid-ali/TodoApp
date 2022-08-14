using System.Text.Json;

namespace TodoApp.Domain.Exceptions;

/// <summary>
/// Extension methods
/// </summary>
public static class ExceptionExtension
{
    /// <summary>
    /// JSON Serializes the exception.
    /// </summary>
    /// <param name="ex"></param>
    /// <param name="errorCode"></param>
    /// <returns></returns>
    public static string ToJson(this Exception ex, int errorCode)
    {
        var erroDict = new Dictionary<string,object>();
        erroDict.Add("error", ex.Message);
        erroDict.Add("code", errorCode);

        return JsonSerializer.Serialize(erroDict);
    }
}