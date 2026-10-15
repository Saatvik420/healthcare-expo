@echo off
setlocal enabledelayedexpansion
echo Starting Healthcare Expo Spring Boot Backend...

:: 1. Check if JAVA_HOME already exists and has bin\java.exe
if defined JAVA_HOME (
    if exist "%JAVA_HOME%\bin\java.exe" goto :found_java
)

:: 2. Check VS Code RedHat Java extensions
for /d %%e in ("%USERPROFILE%\.vscode\extensions\redhat.java-*") do (
    if exist "%%e\jre" (
        for /d %%j in ("%%e\jre\*") do (
            if exist "%%j\bin\java.exe" (
                set "JAVA_HOME=%%j"
                goto :found_java
            )
        )
    )
)

:: 3. Check common JDK installation directories
for %%d in (
    "C:\Program Files\Eclipse Adoptium"
    "C:\Program Files\Java"
    "C:\Program Files\Microsoft"
    "C:\Program Files\Amazon Corretto"
    "C:\Program Files\Zulu"
    "%USERPROFILE%\.jdks"
) do (
    if exist %%d (
        for /d %%j in (%%d\*) do (
            if exist "%%j\bin\java.exe" (
                set "JAVA_HOME=%%j"
                goto :found_java
            )
        )
    )
)

:: 4. Fallback to PowerShell to locate java executable
for /f "usebackq tokens=*" %%p in (`powershell -NoProfile -Command "(Get-Command java -ErrorAction SilentlyContinue).Source"`) do (
    if exist "%%p" (
        for %%a in ("%%p\..\..") do set "JAVA_HOME=%%~fa"
        goto :found_java
    )
)

:found_java
if defined JAVA_HOME (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
    echo [OK] Using JAVA_HOME: %JAVA_HOME%
) else (
    echo [WARNING] No JDK detected in standard paths. Relying on system PATH.
)

cd /d "%~dp0"
call mvnw.cmd spring-boot:run
pause
