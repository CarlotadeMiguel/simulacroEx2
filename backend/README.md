Este backend está desarrollado en Flask y expone una API RESTful para gestionar tareas, con soporte para base de datos, migraciones, variables de entorno y tests automáticos.
### Backend

## Estructura de Directorios

```
backend/
├── app.py
├── config/
│   └── settings.py
├── models/
│   ├── __init__.py
│   └── Tarea.py
├── api/
│   ├── __init__.py
│   └── tareas.py
├── instance/
│   └── tareas.db       
├── migrations/         
├── tests/
│   ├── __init__.py
│   └── test_api.py
├── requirements.txt
└── .env                  

```

## Instala las dependencias 
```
pip install -r requirements.txt
```

## Copia el archivo .env de ejemplo y edítalo
```
cp .env.example .env
```


## Migraciones y base de datos
- Crea la carpeta instance/ si no existe:
```
mkdir instance
```

- Inicializa las migraciones (solo la primera vez):
```
flask db init
```

- Crea la primera migración:
```
flask db migrate -m "Crear tabla tasks"
```

- Aplica la migración a la base de datos:
```
flask db upgrade
```
| Si cambias los modelos, repite los pasos 3 y 4 para actualizar la base de datos


## Ejecución del servidor
- Activa el entorno virtual si no lo está.
```
venv\Scripts\activate
```

- Establece la variable de entorno FLASK_APP:
```
# En Windows
set FLASK_APP=app.py
# En Linux/Mac
export FLASK_APP=app.py
```
- Inicia el servidor:
```
flask run
```
El backend estará disponible en http://127.0.0.1:5000/.


## Endpoints principales
· GET /api/tasks
Devuelve la lista de tareas en formato JSON.

· POST /api/tasks
Recibe un JSON con { "title": "...", "priority": "..." } y crea u
na nueva tarea.

## Tests automáticos
- Ejecuta todos los tests:
```
pytest
```

- Los tests están en la carpeta tests/ y cubren los endpoints principales.