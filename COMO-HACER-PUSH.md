# 🚀 Cómo Subir el Proyecto a GitHub

El repositorio está **completamente preparado y listo** para subir a GitHub. Solo falta la autenticación.

## ✅ Estado Actual

- ✅ Repositorio Git inicializado
- ✅ Todos los archivos añadidos y commiteados
- ✅ Rama `main` creada
- ✅ Remote configurado: `https://github.com/Gusi-ui/reservas-Irene.git`
- ✅ Repositorio limpio (9.4MB - sin node_modules)

## 🎯 Opciones para Hacer Push

### Opción 1: GitHub Desktop (RECOMENDADA - La Más Fácil) ⭐

1. **Descargar GitHub Desktop** si no lo tienes:
   - Ve a: https://desktop.github.com/
   - Descarga e instala

2. **Añadir el repositorio:**
   - Abre GitHub Desktop
   - Ve a `File` → `Add Local Repository`
   - Selecciona la carpeta: `/Users/alamia.es/Public/nutrition-booking-app`
   - Haz clic en `Add Repository`

3. **Autenticarse:**
   - Si no has iniciado sesión, GitHub Desktop te pedirá hacerlo
   - Sigue las instrucciones en pantalla

4. **Hacer Push:**
   - Haz clic en el botón `Push origin` (arriba a la derecha)
   - ¡Listo! Tu código estará en GitHub

---

### Opción 2: Visual Studio Code

1. **Abrir el proyecto en VS Code:**
   ```bash
   cd /Users/alamia.es/Public/nutrition-booking-app
   code .
   ```

2. **Ir a Control de Código Fuente:**
   - Haz clic en el icono de "Source Control" en la barra lateral (icono de rama)

3. **Push:**
   - Haz clic en los tres puntos `···` (arriba a la derecha)
   - Selecciona `Push`
   - VS Code te pedirá autenticarte con GitHub

---

### Opción 3: Terminal con Personal Access Token

1. **Crear un Token en GitHub:**
   - Ve a: https://github.com/settings/tokens
   - Haz clic en `Generate new token` → `Generate new token (classic)`
   - Nombre: "Reservas Irene"
   - Selecciona el scope: `repo` (todos los permisos de repositorio)
   - Haz clic en `Generate token`
   - **¡COPIA EL TOKEN!** (no podrás verlo de nuevo)

2. **Ejecutar el script:**
   ```bash
   cd /Users/alamia.es/Public/nutrition-booking-app
   ./push-to-github.sh
   ```

3. **Autenticarte:**
   - Cuando pida `Username`: escribe `Gusi-ui`
   - Cuando pida `Password`: **pega el token** (no tu contraseña de GitHub)

4. O hacer push directamente:
   ```bash
   git push -u origin main
   ```

---

### Opción 4: Configurar Git Credential Helper (Para Futuro)

Si vas a usar mucho la terminal, puedes configurar Git para que guarde tus credenciales:

```bash
# Configurar el almacén de credenciales
git config --global credential.helper osxkeychain

# Hacer el push (te pedirá credenciales solo esta vez)
cd /Users/alamia.es/Public/nutrition-booking-app
git push -u origin main
```

Usa tu **Personal Access Token** como contraseña.

---

## 📦 ¿Qué se va a subir?

```
✅ Código fuente de Next.js
✅ Configuración de TypeScript y Tailwind
✅ Componentes del sitio web
✅ Sistema de reservas completo
✅ Integración con Supabase
✅ Integración con Stripe
✅ Panel de administración
✅ Documentación (README, INSTRUCCIONES-SETUP)
✅ Scripts SQL para la base de datos
❌ NO incluye: node_modules, .env.local, archivos temporales
```

**Tamaño total:** 9.4MB

---

## 🔍 Verificar que todo está listo

Puedes verificar el estado ejecutando:

```bash
cd /Users/alamia.es/Public/nutrition-booking-app
git status
git log --oneline -1
git remote -v
```

Deberías ver:
- "nothing to commit, working tree clean"
- Un commit: "feat: Sistema de reservas completo con Supabase, Stripe y panel admin"
- Remote: https://github.com/Gusi-ui/reservas-Irene.git

---

## ❓ Problemas Comunes

### "fatal: could not read Username"
- **Solución:** Usa GitHub Desktop o genera un Personal Access Token

### "Authentication failed"
- **Solución:** Asegúrate de usar el token (no tu contraseña) si estás en terminal

### "HTTP 400 error"
- **Solución:** Este error aparece por falta de autenticación. Usa GitHub Desktop o un token válido

---

## 🎉 Después del Push

Una vez que el push sea exitoso, podrás:

1. **Ver tu código en GitHub:**
   - https://github.com/Gusi-ui/reservas-Irene

2. **Configurar despliegue en Vercel:**
   - Ve a: https://vercel.com
   - Conecta tu repositorio de GitHub
   - Configura las variables de entorno
   - ¡Despliega!

3. **Invitar colaboradores** (si es necesario)

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas, revisa:
- `README.md` - Documentación general del proyecto
- `INSTRUCCIONES-SETUP.md` - Guía detallada de configuración

---

**¡Tu proyecto está listo para GitHub! Solo falta que te autentiques.** 🚀

