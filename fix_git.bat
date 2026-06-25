@echo off
echo Removing nested .git directories...
rmdir /s /q "backend\.git" 2>nul
rmdir /s /q "frontend\lm9wed jdid\.git" 2>nul

echo Clearing git cache for nested repos...
git rm --cached backend -f 2>nul
git rm --cached "frontend\lm9wed jdid" -f 2>nul

echo Staging all project files into root repository...
git add .

echo Checking status...
git status

echo Committing changes...
git commit -m "chore: track backend and frontend in root repository"

echo Pushing to GitHub...
git push

echo.
echo Process complete. You can close this window now.
pause
