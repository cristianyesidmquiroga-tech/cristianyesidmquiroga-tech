<h1 align="center">Cristian Muñoz</h1>
<p align="center"><b>Desarrollador Full-Stack</b> · Java (Spring Boot) · Python (Flask) · React · PostgreSQL · Docker</p>
<p align="center">Bogotá, Colombia (UTC-5) · Remoto, medio tiempo y freelance · Español (nativo) · Inglés (B1)</p>

<p align="center">
  <a href="mailto:cristianyesidmquiroga@gmail.com"><img src="https://img.shields.io/badge/Correo-contacto-0b2a4a?style=flat-square&logo=gmail&logoColor=white" alt="Correo"></a>
  <img src="https://img.shields.io/badge/Estado-abierto%20a%20trabajo%20remoto-1a7f37?style=flat-square" alt="Abierto a trabajo remoto">
  <img src="https://img.shields.io/badge/Respuesta-en%2024h-1a5fb4?style=flat-square" alt="Respuesta en 24 horas">
</p>

<details>
<summary><b>Read this in English</b></summary>

<br>

**Full-Stack Developer** · Java (Spring Boot) · Python (Flask) · React · PostgreSQL · Docker. Bogotá, Colombia (UTC-5) · Remote, part-time and freelance · Spanish (native), English (B1).

### About me

I am a full-stack developer in training (Technologist in Software Analysis and Development, SENA) and I build complete web systems from start to finish: database, API, interface and deployment. What matters most to me is that what I build is secure, tested and explainable, so every project ships with automated tests, documentation and a Docker setup that lets anyone run it.

My largest project is an access control system for a training center that I built twice: first in Flask, then as a Spring Boot API with a React front end. I migrated the tests one by one from one version to the other to prove that both behave the same.

### What I can do for you

- Websites and business sites with an admin panel.
- Custom web applications and REST APIs.
- Database design and migrations.
- Deployment with Docker and Coolify.
- Excel and PDF report automation.
- Bug fixing, code review and security review.

### How I work

Every project goes through the same stages, and each stage leaves something that can be reviewed.

1. **Analyze.** I define what will be built, for whom, why and what is needed. If something is unclear, I ask before coding. Output: written requirements.
2. **Research.** I look for ideas, see how similar systems solve the problem and compare options (technologies, structure, risks). Output: decisions with a reason behind them.
3. **Plan and check the plan.** I write the plan and verify it against the requirements before touching code. Changing a plan is cheap; changing finished code is not.
4. **Build in parts.** Module by module, with tests from the first one.
5. **Audit every view.** I treat each screen as a small security audit. I check which role can enter, what data it receives and what happens if someone sends tampered data: role permissions, server-side validation, injection, sessions and cookies, rate limiting and secrets handling. Then I test the view with every user profile, both what it allows and what it must refuse.
6. **Document and deliver.** Structure, deployment and operation are written down so another person can run the project with `docker compose up`.

### Projects

**[Access Control API](https://github.com/cristianyesidmquiroga-tech/spring)** · Java 21, Spring Boot 3, PostgreSQL, Flyway, Testcontainers
Layered REST API for a training center: digital ID cards, gate control, class attendance, messaging and support. It has JWT login, permissions derived from role and position, email verification, password recovery, CAPTCHA, rate limiting and an audit log. 73 endpoints, 7 database migrations, 700+ automated tests and a CI pipeline with coverage reports.

**[Access Control Frontend](https://github.com/cristianyesidmquiroga-tech/react)** · React 19, Vite
Single-page app for that API: protected routes, navigation by role, QR scanner for the gate, bulk user import, light and dark themes and accessible modals.

**[Access Control System (Flask)](https://github.com/cristianyesidmquiroga-tech/porteria-2)** · Flask, PostgreSQL, Docker, Coolify
The first full-stack version of the same system: admin, gate and coordination modules, digital ID cards with barcodes, monthly Excel backups and user manuals. 800+ tests organized by module, by role and by view.

**[Clothing Store (React + Supabase)](https://github.com/cristianyesidmquiroga-tech/supabase)** · React 19, TypeScript, Tailwind 4, Supabase
Public catalog and admin panel with three roles. Permissions are enforced in the interface and in the database with Row Level Security. Docker + Nginx, with a deployment guide for Coolify.

**[Clothing Store (Flask)](https://github.com/cristianyesidmquiroga-tech/Vshein)** · Flask, SQLAlchemy, Alembic, Pytest
Landing page rendered from the database, hidden admin route with roles and an inventory with stock alerts.

**[Weather Monitoring](https://github.com/cristianyesidmquiroga-tech/Sistema_Clima)** · Flask, PostgreSQL, Redis, Docker Compose
Collects weather stations, hydrological alerts and daily NASA satellite imagery, and publishes a dashboard, a rain map and a weekly regional report with PDF and Excel exports. Seven containers with memory and CPU limits.

### Stack

| Area | Tools |
|---|---|
| Backend | Spring Boot 3 (Security, JPA), Flask, SQLAlchemy, REST, JWT, RBAC, rate limiting, OpenAPI |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, Context API, custom hooks |
| Data | PostgreSQL, MySQL, Redis, Supabase (RLS), Flyway and Alembic migrations |
| DevOps | Docker, Docker Compose, GitHub Actions, Coolify, Traefik, Nginx |
| Quality | JUnit 5, Mockito, Testcontainers, JaCoCo, Pytest, Vitest, OWASP-based checklists |

### Right now

I study at SENA (ADSO) in the afternoons, working on my spoken English, and building a FastAPI service for agricultural accounting.

### Contact

Email: [cristianyesidmquiroga@gmail.com](mailto:cristianyesidmquiroga@gmail.com). I reply within 24 hours.

</details>

---

## Sobre mí

Soy desarrollador full-stack en formación (Tecnólogo en Análisis y Desarrollo de Software, SENA) y construyo sistemas web completos de principio a fin: base de datos, API, interfaz y despliegue. Lo que más me importa es que lo que hago sea seguro, esté probado y se pueda explicar; por eso cada proyecto trae pruebas automáticas, documentación y una configuración Docker para que cualquiera pueda ponerlo a correr.

Mi proyecto más grande es un sistema de control de acceso para un centro de formación que construí dos veces: primero en Flask y después como API en Spring Boot con frontend en React. Migré las pruebas una por una de una versión a la otra para comprobar que las dos se comportan igual.

## Qué puedo hacer por ti

- Páginas y sitios web para negocios, con panel de administración.
- Aplicaciones web a la medida y APIs REST.
- Diseño de bases de datos y migraciones.
- Despliegue con Docker y Coolify.
- Automatización de reportes en Excel y PDF.
- Corrección de errores, revisión de código y revisión de seguridad.

## Cómo trabajo

Cada proyecto pasa por las mismas etapas, y cada etapa deja algo que se puede revisar.

1. **Analizo.** Defino qué se va a construir, para quién, por qué y qué hace falta. Si algo no está claro, lo pregunto antes de programar. Resultado: requisitos escritos.
2. **Investigo.** Busco ideas, miro cómo resuelven el problema otros sistemas parecidos y comparo opciones (tecnologías, estructura, riesgos). Resultado: decisiones con una razón detrás.
3. **Planeo y compruebo el plan.** Escribo el plan y lo verifico contra los requisitos antes de tocar código. Cambiar un plan es barato; cambiar código terminado, no.
4. **Construyo por partes.** Módulo por módulo, con pruebas desde el primero.
5. **Audito cada vista.** Trato cada pantalla como una pequeña auditoría de seguridad. Reviso qué rol puede entrar, qué datos recibe y qué pasa si alguien envía datos manipulados: permisos por rol, validación en el servidor, inyección, sesiones y cookies, límite de peticiones y manejo de secretos. Después pruebo la vista con todos los perfiles de usuario, tanto lo que permite como lo que debe negar.
6. **Documento y entrego.** La estructura, el despliegue y la operación quedan escritos para que otra persona pueda correr el proyecto con `docker compose up`.

## Proyectos

**[API de control de acceso](https://github.com/cristianyesidmquiroga-tech/spring)** · Java 21, Spring Boot 3, PostgreSQL, Flyway, Testcontainers
API REST por capas para un centro de formación: carnet digital, control de portería, asistencia a clase, mensajería y soporte. Tiene login con JWT, permisos que salen del rol y el cargo, verificación de correo, recuperación de contraseña, CAPTCHA, límite de peticiones y registro de auditoría. 73 endpoints, 7 migraciones de base de datos, más de 700 pruebas automáticas y un pipeline de CI con informes de cobertura.

**[Frontend de control de acceso](https://github.com/cristianyesidmquiroga-tech/react)** · React 19, Vite
Aplicación de una sola página para esa API: rutas protegidas, navegación según el rol, escáner QR para la portería, importación masiva de usuarios, tema claro y oscuro y modales accesibles.

**[Sistema de control de acceso (Flask)](https://github.com/cristianyesidmquiroga-tech/porteria-2)** · Flask, PostgreSQL, Docker, Coolify
La primera versión full-stack del mismo sistema: módulos de administración, portería y coordinación, carnets digitales con código de barras, respaldos mensuales en Excel y manuales de usuario. Más de 800 pruebas organizadas por módulo, por rol y por vista.

**[Tienda de ropa (React + Supabase)](https://github.com/cristianyesidmquiroga-tech/supabase)** · React 19, TypeScript, Tailwind 4, Supabase
Catálogo público y panel administrativo con tres roles. Los permisos se aplican en la interfaz y en la base de datos con Row Level Security. Docker + Nginx, con guía de despliegue en Coolify.

**[Tienda de ropa (Flask)](https://github.com/cristianyesidmquiroga-tech/Vshein)** · Flask, SQLAlchemy, Alembic, Pytest
Landing renderizada desde la base de datos, ruta de administración oculta con roles e inventario con alertas de stock.

**[Monitoreo del clima](https://github.com/cristianyesidmquiroga-tech/Sistema_Clima)** · Flask, PostgreSQL, Redis, Docker Compose
Recoge estaciones meteorológicas, alertas hidrológicas e imágenes satelitales diarias de la NASA, y publica un panel, un mapa de lluvias y un reporte semanal de la región con exportación a PDF y Excel. Siete contenedores con límites de memoria y CPU.

## Stack

<p>
  <img src="https://skillicons.dev/icons?i=java,spring,python,flask,react,ts,js,vite,tailwind&perline=9" alt="Lenguajes y frameworks"><br>
  <img src="https://skillicons.dev/icons?i=postgres,mysql,redis,supabase,docker,nginx,github,githubactions,linux&perline=9" alt="Datos y DevOps">
</p>

| Área | Herramientas |
|---|---|
| Backend | Spring Boot 3 (Security, JPA), Flask, SQLAlchemy, REST, JWT, RBAC, límite de peticiones, OpenAPI |
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, Context API, hooks propios |
| Datos | PostgreSQL, MySQL, Redis, Supabase (RLS), migraciones con Flyway y Alembic |
| DevOps | Docker, Docker Compose, GitHub Actions, Coolify, Traefik, Nginx |
| Calidad | JUnit 5, Mockito, Testcontainers, JaCoCo, Pytest, Vitest, listas de chequeo basadas en OWASP |

## Ahora mismo

Estudio en el SENA (ADSO) por las tardes, mejoro mi inglés hablado y construyo un servicio en FastAPI para contabilidad agrícola.

## Contacto

Correo: [cristianyesidmquiroga@gmail.com](mailto:cristianyesidmquiroga@gmail.com). Respondo en menos de 24 horas.
