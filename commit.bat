@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "C:\PROJETO\UpdateGithub"

echo.
echo ========================================
echo   MemoryPerson - GitHub Auto Update
echo ========================================
echo.

REM ==================================================
REM Verifica repositorio
REM ==================================================

if not exist ".git" (
    echo [ERRO] Repositorio Git nao encontrado.
    exit /b 1
)

REM ==================================================
REM Verifica branch
REM ==================================================

for /f "delims=" %%B in ('git branch --show-current') do set "BRANCH=%%B"

if not "!BRANCH!"=="master" (
    echo [ERRO] A branch atual nao e master.
    echo Branch atual: !BRANCH!
    exit /b 1
)

echo [OK] Branch: master

REM ==================================================
REM Data e hora
REM ==================================================

for /f "delims=" %%I in ('powershell -NoProfile -Command "Get-Date -Format \"yyyy-MM-dd HH:mm:ss\""') do set "NOW=%%I"

echo.
echo [1/4] Atualizando update.md...
echo [OK] Data/Hora: !NOW!

REM ==================================================
REM Cria update.md se nao existir
REM ==================================================

if not exist "update.md" (
    echo # MemoryPerson - Automated Update Log>update.md
    echo.>>update.md
)

REM ==================================================
REM Adiciona novo registro
REM ==================================================

echo - !NOW! - Automated synchronization>>update.md

echo [OK] Registro adicionado.

REM ==================================================
REM Git Add
REM ==================================================

echo.
echo [2/4] Preparando arquivos para commit...

git add -A

if errorlevel 1 (
    echo [ERRO] Falha no git add.
    exit /b 1
)

echo [OK] Arquivos preparados.

REM ==================================================
REM Verifica se existe alteracao staged
REM ==================================================

git diff --cached --quiet

if not errorlevel 1 (
    echo [ERRO] Nenhuma alteracao preparada para commit.
    exit /b 1
)

REM ==================================================
REM Commit
REM ==================================================

echo.
echo [3/4] Criando commit...

git commit -m "chore: automated update"

if errorlevel 1 (
    echo [ERRO] Falha no commit.
    exit /b 1
)

echo [OK] Commit criado.

REM ==================================================
REM Push
REM ==================================================

echo.
echo [4/4] Enviando para GitHub...

git push origin master

if errorlevel 1 (
    echo.
    echo ========================================
    echo   [ERRO] PUSH NAO REALIZADO
    echo ========================================
    echo.
    exit /b 1
)

echo.
echo ========================================
echo   ATUALIZACAO CONCLUIDA
echo ========================================
echo.
echo Branch : master
echo Data   : !NOW!
echo Status : PUSH REALIZADO
echo.

endlocal
exit /b 0