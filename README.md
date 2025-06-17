# Simulacro Examen Módulo 2 - Gestor de Tareas Fullstack

Aplicación completa de gestión de tareas desarrollada con **Flask** (backend) y **React + Tailwind CSS** (frontend), implementando autenticación JWT, API REST completa y gestión de usuarios.

---

## 📋 Descripción del Proyecto

Este proyecto implementa un **sistema completo de gestión de tareas** que permite a los usuarios:

- **Registro e inicio de sesión** con autenticación JWT
- **Crear, editar, eliminar y visualizar tareas** personales
- **Gestión de prioridades** (alta, media, baja)
- **Sesión persistente** que se mantiene al recargar la página
- **Interfaz moderna y responsive** con React y Tailwind CSS
- **API REST completa** con endpoints protegidos
- **Base de datos** con migraciones automáticas
- **Tests automáticos** para verificar la funcionalidad

---

## 🏗️ Arquitectura del Proyecto

```
SimulacroExamen2/
│
├── backend/                    # API Flask con JWT
│   ├── app.py                 # Punto de entrada de la aplicación
│   ├── config/
│   │   └── settings.py        # Configuración de entornos
│   ├── models/
│   │   ├── __init__.py
│   │   ├── Usuario.py         # Modelo de usuarios
│   │   └── Tarea.py          # Modelo de tareas
│   ├── api/
│   │   ├── __init__.py
│   │   ├── auth.py           # Endpoints de autenticación
│   │   └── tareas.py         # Endpoints de tareas (CRUD)
│   ├── instance/
│   │   └── tareas.db         # Base de datos SQLite
│   ├── migrations/           # Migraciones de BD (autogenerado)
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_api.py       # Tests automáticos
│   ├── requirements.txt      # Dependencias Python
│   └── .env                  # Variables de entorno
│
├── frontend/                  # Aplicación React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx     # Componente de login
│   │   │   ├── Register.jsx  # Componente de registro
│   │   │   ├── TaskList.jsx  # Lista de tareas
│   │   │   ├── TaskForm.jsx  # Formulario de tareas
│   │   │   └── TaskItem.jsx  # Tarea individual
│   │   ├── api/
│   │   │   └── axios.js      # Configuración de Axios
│   │   ├── App.jsx           # Componente principal
│   │   └── main.jsx          # Punto de entrada
│   ├── package.json          # Dependencias Node.js
│   ├── vite.config.js        # Configuración de Vite
│   └── tailwind.config.js    # Configuración de Tailwind
│
├── .gitignore                # Archivos a ignorar en Git
└── README.md                 # Este archivo
```

---

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Python 3.8+**
- **Node.js 16+**
- **npm** o **yarn**
- **Git**

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd SimulacroExamen2
```

### 2. Configuración del Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Crear carpeta para la base de datos
mkdir instance

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores
```

**Archivo `.env` de ejemplo:**
```env
FLASK_ENV=development
JWT_SECRET_KEY=tu-clave-secreta-super-segura
DATABASE_URI=sqlite:///instance/tareas.db
SESSION_COOKIE_SECURE=False
CSRF_ENABLED=True
CORS_ORIGINS=http://localhost:5173
```

**Inicializar base de datos:**
```bash
# Configurar Flask
set FLASK_APP=app.py        # Windows
export FLASK_APP=app.py     # Linux/Mac

# Crear migraciones
flask db init
flask db migrate -m "Crear tablas usuarios y tareas"
flask db upgrade
```

**Ejecutar el backend:**
```bash
flask run
# El servidor estará en http://localhost:5000
```

### 3. Configuración del Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
# La aplicación estará en http://localhost:5173
```

---

## 🔑 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/registro` | Registrar nuevo usuario | No |
| POST | `/api/auth/login` | Iniciar sesión | No |

**Ejemplo de registro:**
```bash
curl -X POST http://localhost:5000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com", "password":"mipassword"}'
```

**Ejemplo de login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com", "password":"mipassword"}'
```

### Gestión de Tareas (Protegidas con JWT)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/tareas` | Listar tareas del usuario | JWT requerido |
| POST | `/api/tareas` | Crear nueva tarea | JWT requerido |
| GET | `/api/tareas/{id}` | Obtener tarea específica | JWT requerido |
| PUT | `/api/tareas/{id}` | Actualizar tarea | JWT requerido |
| DELETE | `/api/tareas/{id}` | Eliminar tarea | JWT requerido |

**Ejemplo de crear tarea:**
```bash
curl -X POST http://localhost:5000/api/tareas \
  -H "Authorization: Bearer <TOKEN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Mi tarea", "prioridad":"alta", "descripcion":"Detalles opcionales"}'
```

**Estructura de datos de tarea:**
```json
{
  "id": 1,
  "titulo": "Completar proyecto",
  "prioridad": "alta",
  "descripcion": "Finalizar todas las funcionalidades",
  "completada": false,
  "usuario_id": 1
}
```

---

## 🎨 Características del Frontend

### Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Tailwind CSS** - Framework de CSS utilitario
- **Axios** - Cliente HTTP
- **Vite** - Bundler y servidor de desarrollo

### Funcionalidades Implementadas

- ✅ **Login y Registro** con validación de formularios
- ✅ **Sesión persistente** usando localStorage
- ✅ **CRUD completo de tareas** (crear, leer, actualizar, eliminar)
- ✅ **Interfaz responsive** con Tailwind CSS
- ✅ **Feedback visual** para errores y éxito
- ✅ **Loading states** durante las peticiones
- ✅ **Navegación fluida** entre formularios
- ✅ **Auto-login** tras registro exitoso

### Componentes Principales

- **App.jsx** - Manejo de autenticación y rutas principales
- **Login.jsx** - Formulario de inicio de sesión
- **Register.jsx** - Formulario de registro con auto-login
- **TaskList.jsx** - Gestión completa de tareas (lista, crear, editar, eliminar)
- **TaskForm.jsx** - Formulario reutilizable para crear/editar tareas
- **TaskItem.jsx** - Componente individual de tarea

---

## 🧪 Testing

### Ejecutar Tests del Backend

```bash
cd backend
pytest
# o
pytest tests/ -v
```

### Tests Incluidos

- ✅ Test de endpoints de autenticación (registro/login)
- ✅ Test de CRUD de tareas con JWT
- ✅ Test de validaciones y errores
- ✅ Test de asociación usuario-tareas

---

## 🔧 Configuración Avanzada

### Proxy de Desarrollo

El frontend está configurado con un proxy en `vite.config.js` que redirige automáticamente las peticiones `/api` al backend Flask:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

### Interceptor de Axios

El frontend incluye un interceptor de Axios que añade automáticamente el token JWT a todas las peticiones:

```javascript
client.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🔒 Seguridad

### Funcionalidades de Seguridad Implementadas

- **Autenticación JWT** con tokens que expiran en 2 horas
- **Hasheo de contraseñas** con bcrypt
- **CORS configurado** para permitir solo orígenes específicos
- **Validación de datos** en backend y frontend
- **Rutas protegidas** que requieren autenticación
- **Asociación usuario-tareas** para aislamiento de datos

### Variables de Entorno Sensibles

```env
JWT_SECRET_KEY=tu-clave-secreta-muy-segura-para-produccion
DATABASE_URI=sqlite:///instance/tareas.db
CORS_ORIGINS=http://localhost:5173,https://tu-dominio.com
```

---

## 📦 Despliegue

### Backend (Flask)

```bash
# Instalar dependencias de producción
pip install -r requirements.txt

# Configurar variables de entorno para producción
export FLASK_ENV=production
export JWT_SECRET_KEY=tu-clave-secreta-de-produccion

# Aplicar migraciones
flask db upgrade

# Ejecutar con gunicorn (recomendado para producción)
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend (React)

```bash
# Construir para producción
npm run build

# Los archivos estáticos estarán en dist/
# Puedes servirlos con cualquier servidor web (Nginx, Apache, etc.)
```

---

## 🐛 Solución de Problemas Comunes

### Error 422 "Not enough segments"

**Causa:** Token JWT inválido o mal formado
**Solución:** Verificar que el token se envía correctamente en el header Authorization

### Error de CORS

**Causa:** Frontend y backend en diferentes puertos
**Solución:** Verificar configuración de CORS en Flask y proxy en Vite

### Base de datos bloqueada

**Causa:** Múltiples instancias accediendo a SQLite
**Solución:** Cerrar todas las instancias de Flask y reiniciar

### Dependencias no encontradas

**Causa:** Entorno virtual no activado o dependencias no instaladas
**Solución:** Activar entorno virtual y ejecutar `pip install -r requirements.txt`

---

## 🛠️ Scripts Útiles

### Backend

```bash
# Crear nueva migración
flask db migrate -m "Descripcion del cambio"

# Aplicar migraciones
flask db upgrade

# Ejecutar tests
pytest

# Ejecutar con debug
flask run --debug
```

### Frontend

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## 📚 Recursos y Referencias

- [Documentación de Flask](https://flask.palletsprojects.com/)
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)
- [Vite Documentation](https://vitejs.dev/)

---

## 👥 Contribución

Este proyecto fue desarrollado como simulacro de examen del Módulo 2. Las mejoras y sugerencias son bienvenidas a través de issues y pull requests.

### Mejoras Futuras Sugeridas

- [ ] Implementar roles de usuario (admin, user)
- [ ] Añadir filtros y búsqueda de tareas
- [ ] Implementar notificaciones push
- [ ] Añadir fechas de vencimiento
- [ ] Implementar categorías de tareas
- [ ] Añadir tests end-to-end con Cypress
- [ ] Implementar PWA (Progressive Web App)
- [ ] Añadir documentación de API con Swagger

---

## 📄 Licencia

Este proyecto es de uso educativo y está disponible bajo la licencia MIT.

---

**Desarrollado con ❤️ para el Simulacro de Examen Módulo 2**

*¿Tienes preguntas? Consulta la documentación o abre un issue en el repositorio.*