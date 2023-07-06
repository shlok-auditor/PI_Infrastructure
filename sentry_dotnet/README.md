# Sentry_dotnet

Welcome to Sentry_dotnet! This document will guide you through the integration of Sentry error tracking in your .NET project.

## Prerequisites

- .NET Framework/Core SDK (version 7.0.305)
- Package manager (NuGet for .NET Framework, dotnet CLI for .NET Core)

## Installation

1. Open your project in Visual Studio or your preferred IDE.
2. Add the Sentry package to your project:
   - For .NET Framework projects:
     Open the NuGet Package Manager Console and run the following command:
     ```
     Install-Package Sentry
     ```

   - For .NET Core projects:
     Open the terminal and navigate to your project's root directory, then run the following command:
     ```
     dotnet add package Sentry
     ```

3. Configuration
   - Open your application's startup code, such as Global.asax.cs for .NET Framework or Startup.cs for .NET Core.
   - Import the Sentry namespace at the top of the file:
     ```csharp
     using Sentry;
     ```
   - Initialize the Sentry SDK with your DSN (Data Source Name):
     ```csharp
     SentrySdk.Init(options =>
     {
         options.Dsn = "https://486c526db3a945fb88756e8562e7f1c4@o4505441023688704.ingest.sentry.io/4505469962944512";
         // Additional configuration options can be set here
     });
     ```

## Usage

To capture exceptions and send them to Sentry, follow these steps:

1. Wrap your code in a try-catch block.
2. Inside the catch block, call `SentrySdk.CaptureException` or `SentrySdk.CaptureExceptionAsync`:
   ```csharp
   try
   {
       // Your code that may throw an exception
   }
   catch (Exception ex)
   {
       // Capture the exception and send it to Sentry
       SentrySdk.CaptureException(ex);
   }
