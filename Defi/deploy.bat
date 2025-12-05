@echo off
echo.
echo ============================================
echo    DEPLOIEMENT VILLAGE NIRD
echo ============================================
echo.

echo Verification des fichiers necessaires...
if not exist "index.html" (
    echo ERREUR: index.html manquant !
    pause
    exit /b 1
)
if not exist "style.css" (
    echo ERREUR: style.css manquant !
    pause
    exit /b 1
)
if not exist "script.js" (
    echo ERREUR: script.js manquant !
    pause
    exit /b 1
)

echo ✅ Tous les fichiers sont presents !
echo.

echo Quelle plateforme de deploiement choisissez-vous ?
echo.
echo 1. GitHub Pages
echo 2. Netlify Drop
echo 3. Test local (serveur HTTP)
echo 4. Vercel
echo 5. Copier pour hebergeur FTP
echo.

set /p choice="Votre choix (1-5): "

if "%choice%"=="1" goto github
if "%choice%"=="2" goto netlify  
if "%choice%"=="3" goto local
if "%choice%"=="4" goto vercel
if "%choice%"=="5" goto ftp
goto invalid

:github
echo.
echo 📡 DEPLOIEMENT GITHUB PAGES
echo ============================
echo.
echo 1. Creez un repository GitHub
echo 2. Uploadez tous les fichiers du projet
echo 3. Activez GitHub Pages dans Settings
echo 4. Votre site sera disponible sur: username.github.io/repository-name
echo.
echo Voulez-vous ouvrir GitHub ? (o/n)
set /p open="Reponse: "
if /i "%open%"=="o" start https://github.com
goto end

:netlify
echo.
echo ⚡ DEPLOIEMENT NETLIFY DROP
echo ===========================
echo.
echo 1. Allez sur https://netlify.com
echo 2. Glissez-deposez le dossier complet sur Netlify Drop
echo 3. Votre site sera instantanement en ligne !
echo.
echo Voulez-vous ouvrir Netlify ? (o/n)
set /p open="Reponse: "
if /i "%open%"=="o" start https://netlify.com
goto end

:local
echo.
echo 🏠 TEST LOCAL
echo =============
echo.
echo Demarrage du serveur HTTP local...
echo Votre site sera accessible sur: http://localhost:8000
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.
python -m http.server 8000
goto end

:vercel
echo.
echo 🚀 DEPLOIEMENT VERCEL
echo ======================
echo.
echo 1. Installez Vercel CLI: npm i -g vercel
echo 2. Executez: vercel
echo 3. Suivez les instructions
echo.
echo Voulez-vous ouvrir Vercel ? (o/n)
set /p open="Reponse: "
if /i "%open%"=="o" start https://vercel.com
goto end

:ftp
echo.
echo 📁 PREPARATION POUR FTP
echo ========================
echo.
echo Creation du package de deploiement...
mkdir village-nird-deploy 2>nul
copy *.html village-nird-deploy\
copy *.css village-nird-deploy\
copy *.js village-nird-deploy\
copy *.json village-nird-deploy\
copy *.md village-nird-deploy\

echo.
echo ✅ Package cree dans le dossier: village-nird-deploy
echo.
echo Uploadez le contenu de ce dossier sur votre serveur web
echo via FTP ou votre interface d'hebergement.
echo.
explorer village-nird-deploy
goto end

:invalid
echo.
echo ❌ Choix invalide. Veuillez choisir entre 1 et 5.
pause
goto start

:end
echo.
echo 🎉 Village NIRD pret pour la resistance numerique !
echo.
echo 📊 Statistiques du projet:
echo - Fichiers: 6 fichiers principaux
echo - Taille totale: ~70KB
echo - Technologies: HTML5, CSS3, JavaScript Vanilla
echo - Compatibilite: Tous navigateurs modernes
echo - Licence: Libre et open-source
echo.
echo 🏘️ Merci d'avoir contribue au Village Numerique Resistant !
echo.
pause