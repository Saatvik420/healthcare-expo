@echo off
echo Starting Healthcare Expo Spring Boot Backend...

if not defined JAVA_HOME (
    for /d %%i in ("%USERPROFILE%\.vscode\extensions\redhat.java-*\jre\*") do (
        if exist "%%i\bin\java.exe" set "JAVA_HOME=%%i"
    )
)

if defined JAVA_HOME (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
    echo Using JAVA_HOME: %JAVA_HOME%
) else (
    echo [WARNING] No JAVA_HOME detected in environment or VS Code extensions. Relying on system PATH.
)

cd /d "%~dp0"
call mvnw.cmd spring-boot:run
pause
