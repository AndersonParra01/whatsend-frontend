# EnvioMasivoWhatApps

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 1. Dashboard / Inicio

**Función:**

- Presenta un resumen general del estado del sistema.
- Muestra estadísticas clave (número de mensajes enviados, tasa de éxito, errores, etc.).
- Incluye gráficos, notificaciones recientes y alertas sobre la actividad del sistema.

# 2. Enviar Mensajes

**Función:**

- Es el módulo principal para configurar y programar los envíos masivos.
- Permite redactar el mensaje (con opciones de edición y, si se desea, un selector de emojis).
- Ofrece la opción de seleccionar o definir el intervalo de tiempo para el envío automático.
- Incluye controles para iniciar, pausar o cancelar un envío.

# 3. Contactos / Grupos

**Función:**

- Gestiona la base de datos de destinatarios.
- Permite importar/exportar contactos (por ejemplo, mediante archivos CSV o Excel).
- Facilita la creación y gestión de grupos o segmentos de audiencia para envíos específicos.

# 4. Historial / Reportes

**Función:**

- Muestra un registro detallado de los envíos realizados.
- Proporciona reportes y métricas de rendimiento: cantidad de mensajes entregados, fallidos, abiertos, etc.
- Permite exportar datos o visualizar gráficos comparativos para análisis.

# 5. Configuración

**Función:**

- Permite ajustar parámetros generales del sistema, como intervalos de envío, plantillas de mensajes o configuración de API.
- Incluye opciones de integración (por ejemplo, la conexión con la API de WhatsApp).
- Gestiona aspectos de seguridad, roles de usuario y notificaciones del sistema.

# 6. Soporte / Ayuda

**Función:**

- Brinda acceso a recursos de asistencia, tutoriales, FAQs y documentación.
- Puede incluir un chat en vivo o enlaces para contactar al equipo de soporte.

# 7. Perfil de Usuario

**Función:**

- Permite al usuario ver y editar su información personal (nombre, foto, correo, etc.).
- Incluye opciones para cambiar contraseña, configurar notificaciones y ver historial de actividad personal.
