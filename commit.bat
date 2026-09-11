@echo off
setlocal

cd /d "C:\PROJETO\UpdateGithub"

echo.
echo ========================================
echo   MemoryPerson - GitHub Auto Update
echo ========================================
echo.

REM Atualiza o arquivo com data e hora
(
echo # MemoryPerson - Automated Update
echo.
echo Ultima atualizacao: %date% %time%
echo.
echo Sincronizacao automatica realizada pelo Windows.
) > update.md

echo [1/4] Arquivo update.md atualizado.

REM Adiciona a alteracao
git add update.md

echo [2/4] Arquivo adicionado ao Git.

REM Cria o commit
git commit -m "chore: automated update %date% %time%"

echo [3/4] Commit criado.

REM Envia para o GitHub
git push origin master

echo [4/4] Push realizado.

echo.
echo ========================================
echo   Atualizacao concluida!
echo ========================================
echo.

endlocal
:: pause
