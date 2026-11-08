# Backend CRUD - Laboratorio II

Laboratorio II de Programación en Ambiente Web I (UCEVA, Facultad de Ingeniería).

API REST desarrollada con Node.js, Express y TypeScript que usa PostgreSQL como base de datos y Docker Compose para levantar los servicios. El proyecto parte del repositorio del docente (módulos de Estudiantes y Cursos) y se le agregaron dos módulos nuevos: Docentes y Salones.

## Integrantes

- Johan Eliu Salgado Castro (230232033)

## Tecnologías

- Node.js 18 o superior
- Express 5
- TypeScript
- PostgreSQL 15.3 (imagen de Docker)
- pgAdmin 4 (imagen de Docker)
- Docker y Docker Compose

## Módulos

| Módulo | Ruta base | Tabla |
| --- | --- | --- |
| Estudiantes | `/api/students` | `students` |
| Cursos | `/api/courses` | `courses` |
| Docentes | `/api/teachers` | `teachers` |
| Salones | `/api/classrooms` | `classrooms` |

## Estructura

```
Backend/
├── docker-compose.yml
├── package.json
├── .env
└── src/
    ├── app.ts
    ├── config/
    ├── database/
    │   ├── init.sql
    │   ├── seed.sql
    │   └── consult.sql
    ├── domain/
    │   ├── dtos/
    │   ├── errors/
    │   └── interfaces/
    ├── presentation/
    │   ├── routes.ts
    │   ├── server.ts
    │   └── modules/
    │       ├── student/
    │       ├── course/
    │       ├── teacher/
    │       └── classroom/
    └── scripts/
        ├── init-db.ts
        └── seed-db.ts
```

Cada módulo sigue la misma arquitectura: interfaz y DTOs en `domain`, y servicio, controlador y rutas en `presentation/modules`.

## Cómo ejecutar el proyecto

1. Clonar el repositorio y entrar a la carpeta del backend:

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>/Backend
```

2. Levantar la base de datos con Docker Compose:

```bash
docker compose up -d
```

3. Instalar las dependencias:

```bash
npm install
```

4. Crear las tablas y cargar los datos iniciales:

```bash
npm run db:init
npm run db:seed
```

5. Iniciar el servidor:

```bash
npm start
```

El servidor queda disponible en `http://localhost:3000` y pgAdmin en `http://localhost:8080`.

## Endpoints

Todos los módulos tienen las mismas cinco operaciones:

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/<modulo>` | Consultar todos los registros |
| GET | `/api/<modulo>/:id` | Consultar un registro por id |
| POST | `/api/<modulo>` | Crear un registro |
| PUT | `/api/<modulo>/:id` | Actualizar un registro |
| DELETE | `/api/<modulo>/:id` | Eliminar un registro |

### Docentes

Ejemplo de cuerpo para `POST /api/teachers` y `PUT /api/teachers/:id`:

```json
{
  "name": "Ana Torres",
  "email": "ana.torres@gmail.com",
  "phone": "3111234567",
  "specialty": "Compiladores",
  "experience": 5,
  "status": true
}
```

- `phone` debe tener 10 dígitos.
- `experience` va de 0 a 60 años.
- `email` y `phone` no se pueden repetir.
- En `POST` el campo `status` es opcional (por defecto `true`); en `PUT` es obligatorio.

### Salones

Ejemplo de cuerpo para `POST /api/classrooms` y `PUT /api/classrooms/:id`:

```json
{
  "name": "Aula 401",
  "building": "Bloque B",
  "capacity": 50,
  "projector": true,
  "status": true
}
```

- `capacity` va de 1 a 200.
- `name` no se puede repetir.
- En `POST` los campos `projector` y `status` son opcionales (por defecto `false` y `true`); en `PUT` son obligatorios.

### Códigos de respuesta

| Código | Significado |
| --- | --- |
| 200 | Operación exitosa |
| 201 | Registro creado |
| 400 | Datos inválidos o id incorrecto |
| 404 | No existe un registro con ese id |
| 409 | Ya existe un registro con ese valor único |

## Convención de commits

Se usa Conventional Commits con descripciones en español:

- `feat:` nueva funcionalidad
- `fix:` corrección de errores
- `docs:` cambios en la documentación
- `refactor:` mejoras al código sin cambiar su comportamiento
- `chore:` tareas de mantenimiento
