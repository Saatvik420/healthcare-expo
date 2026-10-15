# PowerShell script to run the Spring Boot Backend with automatic JDK detection
Write-Host "Starting Healthcare Expo Spring Boot Backend..." -ForegroundColor Cyan

# Find Java if not in environment or if invalid
if (-not $env:JAVA_HOME -or -not (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    $candidates = @(
        "$HOME\.vscode\extensions\redhat.java-*\jre\*\bin\java.exe",
        "C:\Program Files\Eclipse Adoptium\*\bin\java.exe",
        "C:\Program Files\Java\*\bin\java.exe",
        "C:\Program Files\Microsoft\*\bin\java.exe",
        "C:\Program Files\Amazon Corretto\*\bin\java.exe",
        "C:\Program Files\Zulu\*\bin\java.exe",
        "$HOME\.jdks\*\bin\java.exe"
    )
    foreach ($cand in $candidates) {
        $found = Get-Item -Path $cand -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($found) {
            $env:JAVA_HOME = $found.Directory.Parent.FullName
            break
        }
    }
}

if ($env:JAVA_HOME -and (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    $env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
    Write-Host "[OK] Using JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Green
} else {
    Write-Host "[WARNING] No JDK found in candidate paths. Falling back to system PATH." -ForegroundColor Yellow
}

Set-Location $PSScriptRoot
& .\mvnw.cmd spring-boot:run
