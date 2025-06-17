# Simulacro Examen Módulo 2

Gestor de Tareas: aplicación fullstack con Flask (backend) y HTML+JS (frontend)  
Desarrollado como práctica de simulacro de examen.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Configuración y variables de entorno](#configuración-y-variables-de-entorno)
- [Instalación y ejecución](#instalación-y-ejecución)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Migraciones y base de datos](#migraciones-y-base-de-datos)
- [API: Endpoints principales](#api-endpoints-principales)
- [Testing](#testing)
- [Estructura de archivos clave](#estructura-de-archivos-clave)
- [Resolución de problemas comunes](#resolución-de-problemas-comunes)
- [Notas y buenas prácticas](#notas-y-buenas-prácticas)
- [Autoría](#autoría)

---

## 📝 Descripción

Este proyecto implementa un **gestor de tareas** (to-do list) con un formulario para añadir tareas con título y prioridad, y una lista dinámica de tareas que se actualiza en tiempo real.

### Características principales:
- **Backend**: Flask con SQLAlchemy, Flask-Migrate, Blueprints y CORS
- **Frontend**: HTML, CSS y JavaScript vanilla con fetch API
- **Base de datos**: SQLite con migraciones automáticas
- **API RESTful**: Endpoints para crear y listar tareas
- **Tests automáticos**: Cobertura de endpoints principales
- **Configuración modular**: Variables de entorno y configuraciones por ambiente

---

## ✨ Características

- ✅ Formulario para añadir tareas con título y prioridad (baja, media, alta)
- ✅ Lista dinámica de tareas que se actualiza sin recargar la página
- ✅ API RESTful con Flask y blueprints modulares
- ✅ Base de datos SQLite con migraciones automáticas
- ✅ Configuración por variables de entorno
- ✅ CORS configurado para comunicación frontend-backend
- ✅ Tests automáticos con pytest
- ✅ Estructura de proyecto profesional y escalable

---

## 📁 Estructura del Proyecto

```
simulacroEx2/
│
├── backend/
│   ├── app.py                    # Punto de entrada de la aplicación
│   ├── config/
│   │   └── settings.py           # Configuraciones por ambiente
│   ├── models/
│   │   ├── __init__.py
│   │   └── Tarea.py              # Modelo de datos para tareas
│   ├── api/
│   │   ├── __init__.py           # Blueprint de la API
│   │   └── tareas.py             # Endpoints de tareas
│   ├── instance/
│   │   └── tareas.db             # Base de datos SQLite (no subir a git)
│   ├── migrations/               # Carpeta autogenerada por Flask-Migrate
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_api.py           # Tests automáticos
│   ├── requirements.txt          # Dependencias de Python
│   └── .env                      # Variables de entorno (no subir a git)
│
├── frontend/
│   ├── index.html                # Página principal
│   ├── app.js                    # Lógica JavaScript
│   └── style.css                 # Estilos CSS
│
├── .gitignore                    # Archivos a ignorar en git
└── README.md                     # Este archivo
```

---

## 🔧 Requisitos

- **Python 3.8 o superior**
- **pip** (gestor de paquetes de Python)
- **Virtualenv** (opcional, pero recomendado)
- **Navegador web moderno** (Chrome, Firefox, Safari, Edge)
- **Git** (para clonar el repositorio)

---

## ⚙️ Configuración y variables de entorno

Crea un archivo `.env` en la carpeta `backend/` con la siguiente configuración:

```env
FLASK_ENV=development
JWT_SECRET_KEY=super-secret-key
DATABASE_URI=sqlite:///instance/tareas.db
SESSION_COOKIE_SECURE=False
CSRF_ENABLED=True
CORS_ORIGINS=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_default_key
```

**Nota importante**: Ajusta la ruta de `DATABASE_URI` según tu sistema operativo:
- **Windows**: `sqlite:///C:/ruta/completa/al/proyecto/backend/instance/tareas.db`
- **Linux/Mac**: `sqlite:///instance/tareas.db` (ruta relativa)

---

## 🚀 Instalación y ejecución

### Backend

1. **Clona el repositorio y entra en la carpeta backend:**
   ```bash
   git clone https://github.com/CarlotadeMiguel/simulacroEx2.git
   cd simulacroEx2/backend
   ```

2. **Crea y activa el entorno virtual:**
   ```bash
   python -m venv venv
   
   # En Windows:
   venv\Scripts\activate
   
   # En Linux/Mac:
   source venv/bin/activate
   ```

3. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Crea la carpeta `instance/` si no existe:**
   ```bash
   mkdir instance
   ```

5. **Configura el archivo `.env`** (ver sección anterior)

6. **Ejecuta las migraciones de base de datos:**
   ```bash
   # Inicializar migraciones (solo la primera vez)
   flask db init
   
   # Crear migración para la tabla de tareas
   flask db migrate -m "Crear tabla tasks"
   
   # Aplicar migración a la base de datos
   flask db upgrade
   ```

7. **Configura la variable de entorno FLASK_APP:**
   ```bash
   # En Windows (PowerShell):
   $env:FLASK_APP = "app.py"
   
   # En Windows (CMD):
   set FLASK_APP=app.py
   
   # En Linux/Mac:
   export FLASK_APP=app.py
   ```

8. **Inicia el servidor Flask:**
   ```bash
   flask run
   ```
   El backend estará disponible en `http://localhost:5000/`

### Frontend

1. **Navega a la carpeta frontend:**
   ```bash
   cd ../frontend
   ```

2. **Abre `index.html` en tu navegador web:**
   - Puedes hacer doble clic en el archivo
   - O usar un servidor local simple:
     ```bash
     # Con Python 3:
     python -m http.server 8000
     
     # Luego ve a http://localhost:8000
     ```

3. **¡Listo!** El frontend se conectará automáticamente al backend usando fetch API.

---

## 🗄️ Migraciones y base de datos

El proyecto usa **Flask-Migrate** para gestionar los cambios en la base de datos de forma automática y controlada.

### Comandos útiles de migraciones:

```bash
# Inicializar migraciones (solo la primera vez)
flask db init

# Crear una nueva migración después de cambiar modelos
flask db migrate -m "Descripción del cambio"

# Aplicar migraciones pendientes
flask db upgrade

# Ver historial de migraciones
flask db history

# Revertir a una migración anterior
flask db downgrade
```

### Modelo de datos actual:

La tabla `tasks` contiene:
- `id`: Clave primaria (entero)
- `title`: Título de la tarea (string, obligatorio)
- `priority`: Prioridad de la tarea (string: "baja", "media", "alta")

---

## 🌐 API: Endpoints principales

### Base URL: `http://localhost:5000/api`

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/tasks` | Obtener todas las tareas | Ninguno |
| POST | `/tasks` | Crear una nueva tarea | `title`, `priority` |

### Ejemplos de uso:

**GET /api/tasks**
```bash
curl http://localhost:5000/api/tasks
```
Respuesta:
```json
[
  {
    "id": 1,
    "title": "Estudiar Flask",
    "priority": "alta"
  },
  {
    "id": 2,
    "title": "Hacer la compra",
    "priority": "media"
  }
]
```

**POST /api/tasks**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Nueva tarea", "priority": "baja"}'
```
Respuesta:
```json
{
  "id": 3,
  "title": "Nueva tarea",
  "priority": "baja"
}
```

---

## 🧪 Testing

### Ejecutar tests automáticos:

1. **Asegúrate de estar en la carpeta backend con el entorno virtual activado**
2. **Ejecuta todos los tests:**
   ```bash
   pytest
   ```
3. **Ejecutar tests con más detalle:**
   ```bash
   pytest -v
   ```
4. **Ejecutar tests de un archivo específico:**
   ```bash
   pytest tests/test_api.py
   ```

### Cobertura actual de tests:
- ✅ GET /api/tasks - Obtener lista de tareas
- ✅ POST /api/tasks - Crear nueva tarea
- ✅ Validación de respuestas JSON
- ✅ Códigos de estado HTTP correctos

---

## 📋 Estructura de archivos clave

### Backend - app.py
```python
# Punto de entrada principal de la aplicación Flask
# Configura la app, base de datos, migraciones y blueprints
```

### Backend - config/settings.py
```python
# Configuraciones por ambiente (desarrollo/producción)
# Manejo de variables de entorno
```

### Backend - models/Tarea.py
```python
# Modelo SQLAlchemy para la tabla de tareas
# Define la estructura de datos
```

### Backend - api/tareas.py
```python
# Endpoints de la API REST
# Lógica de negocio para crear y listar tareas
```

### Frontend - app.js
```javascript
// Lógica JavaScript para:
// - Fetch de tareas al cargar la página
// - Envío de formulario
// - Actualización dinámica del DOM
```

### Frontend - index.html
```html
<!-- Estructura HTML con formulario y lista de tareas -->
```

---

## 🔧 Resolución de problemas comunes

### Error: "ModuleNotFoundError: No module named 'models'"
**Solución**: Asegúrate de tener archivos `__init__.py` en las carpetas `models/` y `api/`.

### Error: "sqlite3.OperationalError: unable to open database file"
**Solución**: 
1. Crea la carpeta `instance/` manualmente: `mkdir instance`
2. Verifica que la ruta en `.env` sea correcta para tu sistema

### Error: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solución**: Verifica que Flask-CORS esté instalado y configurado en `app.py`:
```python
from flask_cors import CORS
CORS(app, origins=app.config.get('CORS_ORIGINS', '*'))
```

### Error: "No such command 'db'"
**Solución**: 
1. Instala Flask-Migrate: `pip install flask-migrate`
2. Configura FLASK_APP: `export FLASK_APP=app.py`

### Frontend no se conecta al backend
**Solución**: 
1. Verifica que el backend esté ejecutándose en `http://localhost:5000`
2. Revisa la configuración de CORS_ORIGINS en `.env`
3. Asegúrate de que no hay errores en la consola del navegador

---

## 📝 Notas y buenas prácticas

### Seguridad:
- ❌ **NO subas** archivos `.env` ni `instance/tareas.db` al repositorio
- ✅ **SÍ incluye** la carpeta `migrations/` en el control de versiones
- ✅ Usa `.gitignore` para excluir archivos sensibles

### Desarrollo:
- 🔄 Si cambias los modelos, ejecuta `flask db migrate` y `flask db upgrade`
- 🧪 Ejecuta tests regularmente con `pytest`
- 📝 Documenta nuevos endpoints en este README
- 🏗️ Mantén la estructura modular del proyecto

### Producción:
- 🔒 Cambia `FLASK_ENV` a `production` en el archivo `.env`
- 🗄️ Usa una base de datos más robusta (PostgreSQL, MySQL)
- 🔐 Configura secrets más seguros para JWT_SECRET_KEY
- 🌐 Configura CORS_ORIGINS con dominios específicos

---

## 📚 Recursos útiles

- [Documentación Flask](https://flask.palletsprojects.com/)
- [Documentación Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/)
- [Documentación Flask-Migrate](https://flask-migrate.readthedocs.io/)
- [Documentación Flask-CORS](https://flask-cors.readthedocs.io/)
- [Guía de Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

## 👩‍💻 Autoría

Desarrollado por [CarlotadeMiguel](https://github.com/CarlotadeMiguel) como simulacro de examen del Módulo 2.

**Repositorio**: https://github.com/CarlotadeMiguel/simulacroEx2

---

## 📄 Licencia

Este proyecto es de uso educativo y fue desarrollado como práctica de simulacro de examen.

---

**¡Gracias por revisar este proyecto! Si tienes preguntas o sugerencias, no dudes en crear un issue en el repositorio.**