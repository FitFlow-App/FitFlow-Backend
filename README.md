# FitFlow - Backend

## Descripción

Servidor y API RESTful (Backend) de FitFlow. Gestiona toda la lógica, datos y autenticación de la aplicación.

## Estructura del Proyecto

```text
.
├── docker-compose.yml
├── package.json
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── services/
└── tsconfig.json
```

## Configuración del Entorno

Variables de entorno: Crea un archivo .env en la raíz del proyecto:

```env
DATABASE_URL="postgresql://usuario:mi_contraseña@localhost:15433/fitflow"
POSTGRES_USER=usuario
POSTGRES_PASSWORD=mi_contraseña
POSTGRES_DB=fitflow
JWT_SECRET="clave_ultrasecreta_456"
SERVER_PORT=3000
```

## Instalación y Ejecución

### Usando Docker Compose para la Base de Datos

1. Levantar la base de datos PostgreSQL:

```bash
docker-compose up -d
```

2. Instalar dependencias:

```bash
npm install
```

3. Generar cliente Prisma:

```bash
npm run prisma:generate
```

4. Ejecutar migraciones:

```bash
npm run prisma:migrate
```

5. Poblar la base de datos con datos de prueba:

```bash
npm run prisma:seed
```

6. Ejecutar en modo desarrollo:

```bash
npm run dev
```

## Comandos Útiles de Migración

- Generar Prisma client:

```bash
npm run prisma:generate
```

- Ejecutar migraciones:

```bash
npm run prisma:migrate
```

- Crear datos de prueba:

```bash
npm run prisma:seed
```

- Resetear base de datos con datos de prueba:

```bash
npm run prisma:reset
```

## API Routes Disponibles

### Autenticación

- POST /api/login - Iniciar sesión

### Usuarios

- GET /api/users - Obtener todos los usuarios

- GET /api/users/:id - Obtener usuario por ID

- POST /api/users - Crear nuevo usuario

- PUT /api/users/:id - Actualizar usuario

- DELETE /api/users/:id - Eliminar usuario

### Ejercicios

- GET /api/ejercicios - Obtener todos los ejercicios

- GET /api/ejercicios/:id - Obtener ejercicio por ID

- POST /api/ejercicios - Crear nuevo ejercicio

- PUT /api/ejercicios/:id - Actualizar ejercicio

- DELETE /api/ejercicios/:id - Eliminar ejercicio

### Rutinas

- GET /api/routines - Obtener todas las rutinas

- GET /api/routines/:id - Obtener rutina por ID

- POST /api/routines - Crear nueva rutina

- PUT /api/routines/:id - Actualizar rutina

- DELETE /api/routines/:id - Eliminar rutina

### Ejercicios en Rutinas

- POST /api/routine-exercises - Añadir ejercicio a rutina

- GET /api/routine-exercises/rutina/:rutinaId - Obtener ejercicios de rutina

- PUT /api/routine-exercises/:id - Actualizar ejercicio en rutina

- DELETE /api/routine-exercises/:id - Eliminar ejercicio de rutina

### Planificación

- GET /api/planificacion/usuario/:usuarioId - Obtener planificaciones por usuario

- GET /api/planificacion/:id - Obtener planificación por ID

- POST /api/planificacion - Crear planificación

- PUT /api/planificacion/:id - Actualizar planificación

- DELETE /api/planificacion/:id - Eliminar planificación

- POST /api/planificacion/:id/activate - Activar planificación

### Días Planificados

- POST /api/planificacion/dias - Crear día planificado

- PUT /api/planificacion/dias/:id - Actualizar día planificado

- DELETE /api/planificacion/dias/:id - Eliminar día planificado

- GET /api/planificacion/dias/planificacion/:planificacionId - Obtener días por planificación

- GET /api/planificacion/dias/:id - Obtener día por ID

### Clima

- GET /api/weather - Obtener datos del clima (requiere autenticación)

## Datos de Prueba

Usuario: <admin@gmail.com>

Contraseña: 12345
