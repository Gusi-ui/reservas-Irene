#!/bin/bash

# Script para hacer push al repositorio de GitHub
# Creado para: https://github.com/Gusi-ui/reservas-Irene.git

echo "🚀 Preparando push al repositorio de GitHub..."
echo ""

cd /Users/alamia.es/Public/nutrition-booking-app

# Verificar estado
echo "📊 Estado actual del repositorio:"
git status
echo ""

# Mostrar commits pendientes
echo "📝 Commits que se van a subir:"
git log --oneline -5
echo ""

# Información sobre el tamaño
echo "📦 Tamaño del repositorio: $(du -sh .git | cut -f1)"
echo ""

# Hacer el push
echo "🔄 Haciendo push a GitHub..."
echo "⚠️  Se te pedirá tu autenticación de GitHub"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ ¡Push exitoso! Tu código está ahora en GitHub"
    echo "🔗 Visita: https://github.com/Gusi-ui/reservas-Irene"
else
    echo ""
    echo "❌ Error al hacer push."
    echo ""
    echo "🔐 Opciones de autenticación:"
    echo "1. Usa GitHub Desktop (más fácil): https://desktop.github.com/"
    echo "2. Usa VS Code con la extensión de GitHub"
    echo "3. Genera un Personal Access Token en: https://github.com/settings/tokens"
    echo "   Cuando se te pida 'Username': tu usuario de GitHub"
    echo "   Cuando se te pida 'Password': pega el token (no tu contraseña real)"
fi

