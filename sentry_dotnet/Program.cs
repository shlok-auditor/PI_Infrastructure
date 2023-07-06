using Sentry;
using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;

SentrySdk.Init(options =>
{
    
    options.Dsn = "https://486c526db3a945fb88756e8562e7f1c4@o4505441023688704.ingest.sentry.io/4505469962944512";

    options.Debug = true;

    options.AutoSessionTracking = true;

    options.IsGlobalModeEnabled = true;

    options.EnableTracing = true;

    options.TracesSampleRate = 1.0;
    
    options.AutoSessionTracking = true; // default: false
    // options.Environment = "production";
});
SentrySdk.ConfigureScope(scope =>
{
    
    scope.SetTag("filepath", GetFilePath());
    scope.SetTag("file_name", GetFileName());
});
try
{
    throw null;
}
catch (Exception ex)
{
    SentrySdk.CaptureException(ex);
    SentrySdk.CaptureMessage("Something went wrong");
}

  static string GetFilePath()
    {
        string assemblyLocation = Assembly.GetExecutingAssembly().Location;
        return Path.GetFullPath(assemblyLocation);
    }

      static string? GetFileName()
    {
        string currentFilePath = new StackTrace(true).GetFrame(0).GetFileName();
        string currentFileName = Path.GetFileName(currentFilePath);

        return currentFileName;
    }