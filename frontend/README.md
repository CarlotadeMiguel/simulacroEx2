# Frontend - Simulacro Examen Módulo 2 (React)

Aplicación frontend moderna desarrollada en **React + Vite** con **Tailwind CSS** para la gestión de tareas, incluyendo autenticación JWT, CRUD completo y sesión persistente.

---

## 🚀 Tecnologías Utilizadas

- **React 18** - Librería de UI con hooks modernos
- **Vite** - Build tool rápido y moderno
- **Tailwind CSS** - Framework de utilidades CSS
- **Axios** - Cliente HTTP con interceptores
- **JWT** - Autenticación basada en tokens
- **LocalStorage** - Persistencia de sesión

---

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Formulario de inicio de sesión
│   │   ├── Register.jsx       # Formulario de registro
│   │   ├── TaskList.jsx       # Lista y gestión de tareas
│   │   ├── TaskForm.jsx       # Formulario crear/editar tareas
│   │   └── TaskItem.jsx       # Componente individual de tarea
│   ├── api/
│   │   └── axios.js           # Configuración de Axios y interceptores
│   ├── App.jsx                # Componente principal y enrutado
│   ├── main.jsx               # Punto de entrada de React
│   └── index.css              # Estilos globales con Tailwind
├── index.html
├── vite.config.js             # Configuración de Vite y proxy
├── package.json
├── tailwind.config.js         # Configuración de Tailwind
└── README.md
```

---

## ⚙️ Instalación y Configuración

### 1. Instalación de Dependencias

```bash
npm install
```

### 2. Configuración del Proxy (ya configurado)

En `vite.config.js` está configurado el proxy para redirigir las peticiones `/api` al backend Flask:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    },
  },
}
```

### 3. Ejecución en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🔐 Sistema de Autenticación

### Componentes de Autenticación

- **Login.jsx**: Formulario de inicio de sesión con validación
- **Register.jsx**: Formulario de registro con auto-login tras éxito
- **Gestión de tokens**: JWT almacenado en localStorage para sesión persistente

### Flujo de Autenticación

1. **Login/Registro** → Token JWT recibido del backend
2. **Almacenamiento** → Token guardado en localStorage
3. **Interceptor** → Token enviado automáticamente en cada petición
4. **Persistencia** → Sesión mantenida tras recargar página
5. **Logout** → Token eliminado y redirección a login

---

## 📝 Gestión de Tareas (CRUD Completo)

### Componentes de Tareas

- **TaskList.jsx**: Contenedor principal con estado y lógica
- **TaskForm.jsx**: Formulario reutilizable para crear/editar
- **TaskItem.jsx**: Componente individual con acciones

### Funcionalidades Implementadas

- ✅ **Crear tareas** con título, prioridad y descripción
- ✅ **Listar tareas** del usuario autenticado
- ✅ **Editar tareas** in-place con formulario modal
- ✅ **Eliminar tareas** con confirmación
- ✅ **Prioridades visuales** con colores (alta/media/baja)
- ✅ **Estados de carga** y manejo de errores

---

## 🌐 Configuración de API

### Archivo `src/api/axios.js`

```js
import axios from "axios";

const client = axios.create({
  baseURL: "/api", // Aprovecha el proxy de Vite
});

// Interceptor para enviar JWT automáticamente
client.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para simplificar respuestas
client.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default client;
```

### Endpoints Utilizados

| Método | Ruta | Descripción |
|---------|------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/registro` | Registrar usuario |
| GET | `/tareas` | Listar tareas del usuario |
| POST | `/tareas` | Crear nueva tarea |
| PUT | `/tareas/:id` | Editar tarea existente |
| DELETE | `/tareas/:id` | Eliminar tarea |

---

## 🎨 Estilos con Tailwind CSS

### Configuración

Tailwind está configurado en `tailwind.config.js` para funcionar con Vite:

```js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Clases Principales Utilizadas

- **Layout**: `max-w-xl`, `mx-auto`, `mt-10`
- **Formularios**: `border`, `rounded`, `p-2`, `mb-2`
- **Botones**: `bg-blue-600`, `text-white`, `hover:bg-blue-700`
- **Estados**: `text-red-500` (errores), `text-green-600` (éxito)
- **Prioridades**: `bg-red-200` (alta), `bg-yellow-200` (media), `bg-green-200` (baja)

---

## 🔄 Estados y Ciclo de Vida

### Estado Global (App.jsx)

```js
const [token, setToken] = useState(() => localStorage.getItem("jwt_token"));
const [showRegister, setShowRegister] = useState(false);
```

### Estados Locales

- **TaskList**: `tasks`, `loading`, `error`, `editingTask`
- **Forms**: `email`, `password`, `titulo`, `prioridad`, `descripcion`
- **UI**: `success`, `error` para feedback visual

---

## 📱 Funcionalidades UX/UI

### Navegación Fluida

- **Login ↔ Registro**: Navegación sin recargar página
- **Auto-login**: Tras registro exitoso, login automático
- **Sesión persistente**: Mantiene sesión tras recargar navegador

### Feedback Visual

- **Loading states**: Indicadores de carga durante peticiones
- **Error handling**: Mensajes claros de error con estilo rojo
- **Success feedback**: Confirmaciones de acciones exitosas
- **Validación**: Campos requeridos y formato de email

### Responsive Design

- **Mobile-first**: Diseño adaptable con Tailwind
- **Max-width containers**: Contenido centrado y legible
- **Flexible layouts**: Uso de flexbox y grid

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Construcción
npm run build        # Build para producción
npm run preview      # Preview del build

# Linting
npm run lint         # Ejecuta ESLint
```

---

## 🔧 Solución de Problemas

### Error 422 "Not enough segments"

**Causa**: Token JWT inválido o mal formado
**Solución**: Verificar que el token se guarda correctamente tras login

```js
// Verificar en DevTools → Application → Local Storage
localStorage.getItem("jwt_token")
```

### Error de CORS

**Causa**: Backend no permite peticiones desde el frontend
**Solución**: El proxy de Vite resuelve esto en desarrollo

### Token expirado

**Causa**: JWT ha expirado (configurado a 2 horas)
**Solución**: El usuario debe volver a loguearse

### Problema con rutas

**Causa**: Usar URLs absolutas en lugar del proxy
**Solución**: Usar rutas relativas (`/api/...`)

---

## 🚦 Flujo de Desarrollo

### 1. Configuración Inicial
```bash
git clone <repo>
cd frontend
npm install
```

### 2. Desarrollo
```bash
npm run dev  # Terminal 1 (frontend)
# Asegurar backend corriendo en puerto 5000
```

### 3. Testing Manual
- Registrar usuario nuevo
- Iniciar sesión
- Crear, editar y eliminar tareas
- Verificar persistencia tras recargar

---

## 📚 Recursos y Referencias

- [React Official Docs](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios Documentation](https://axios-http.com/)
- [JWT.io](https://jwt.io/) - Debug JWT tokens

---

## 🏗️ Arquitectura del Componente

### Jerarquía de Componentes

```
App.jsx
├── Login.jsx (si !token)
├── Register.jsx (si !token && showRegister)
└── TaskList.jsx (si token)
    ├── TaskForm.jsx
    └── TaskItem.jsx (por cada tarea)
```

### Flujo de Datos

```
localStorage → App.jsx → Components
     ↑              ↓
 Axios ← API ← Backend JWT
```

---

## 🔄 Próximas Mejoras Posibles

- [ ] React Router para navegación avanzada
- [ ] Context API para estado global
- [ ] Tests unitarios con Jest/Vitest
- [ ] Optimización con React.memo
- [ ] PWA capabilities
- [ ] Modo oscuro/claro
- [ ] Internacionalización (i18n)

---

**Desarrollado como práctica para el Simulacro Examen Módulo 2**  
Frontend React moderno con autenticación JWT y gestión completa de tareas.