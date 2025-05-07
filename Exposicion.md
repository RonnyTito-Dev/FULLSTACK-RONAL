# **💊 Problema Actual de la Botica "Nova Salud"**  


❌ **Gestión manual ineficiente**  
- 📉 **Inventario desactualizado**: Registros en papel o Excel → desabastecimiento frecuente.  
- 🐌 **Procesos lentos**: Facturación manual y búsqueda de productos retrasa la atención.  
- 💸 **Pérdidas económicas**: Errores en stock y precios afectan rentabilidad.  

<br>

🔍 **Consecuencias**:  
- 😠 Clientes insatisfechos por largas esperas.  
- 💊 Medicamentos vencidos o faltantes no detectados a tiempo.  

---

<br>

# **🧩 Solución Propuesta**  

🚀 **Desarrollar un Sistema Fullstack** 

---
<br>


# 📋 Levantamiento de requirimientos

## ✅ **Requerimientos Funcionales**

### **🔐 Autenticación y Seguridad**
#### **1**: **Sistema de autenticación**  
- Los usuarios pueden iniciar sesión mediante credenciales (email y contraseña).

#### **2**: **Encriptación de contraseñas**  
- Las contraseñas se almacenan de manera segura en la base de datos utilizando **bcrypt** para encriptarlas.

#### **3**: **Protección de rutas**  
- El acceso a rutas sensibles del backend está protegido mediante **JWT** (JSON Web Tokens) y cookies con la opción **HTTP-only** para mejorar la seguridad.

---

### **📦 Gestión de Productos**
#### **4**: **Gestión de productos (CRUD)**  
- Los usuarios autorizados (Administrador/Superusuario) pueden **crear, leer, actualizar y eliminar productos**.

#### **5**: **Búsqueda y filtrado de productos**  
- Los productos pueden ser **buscados y filtrados** por nombre, categoría o código de producto.

---

### **👤 Gestión de Clientes**
#### **6**: **Gestión de clientes (CRUD)**  
- Los usuarios autorizados (Administrador/Superusuario) pueden **crear, leer, actualizar y eliminar clientes**.

---

### **💰 Ventas**
#### **7**: **Registro de ventas**  
- El sistema permite **registrar ventas** con los siguientes detalles:  
  - Selección de cliente.  
  - Lista de productos vendidos (incluyendo cantidad, precio unitario y subtotal).  
  - Cálculo automático del **total** de la venta.

#### **8**: **Actualización de stock**  
- El **stock de productos se actualiza automáticamente** al registrar una venta, asegurando la correcta gestión de inventario.

---

### **🖥️ Interfaz de Usuario**
#### **9**: **Dashboard**  
- El sistema presenta un **dashboard** con un resumen de **productos, clientes, ventas, etc.** para facilitar la gestión y supervisión del negocio.

#### **10**: **Diseño intuitivo**  
- La **interfaz de usuario** está diseñada para ser **intuitiva y fácil de usar**, mejorando la experiencia del usuario y facilitando la navegación.

---

### **Responsabilidades por Rol**
- **Superusuario/Administrador**: Acceso a todas las funcionalidades, incluyendo gestión de usuarios, roles, productos, clientes, ventas y logs.
- **Farmacéutico**: Acceso para registrar y visualizar ventas, consultar productos y modificar su perfil.
- **Cajero**: Acceso para registrar y visualizar ventas, consultar productos y visualizar el dashboard.

---

<br>

## 🛡️ **Requerimientos No Funcionales**

### **🔒 Seguridad**
#### **1**: **Cookies HTTP-only**  
- Utilizar **cookies HTTP-only** para evitar ataques de **Cross-Site Scripting (XSS)**, protegiendo las sesiones de los usuarios.

#### **2**: **JWT con expiración corta**  
- El sistema debe implementar **JSON Web Tokens (JWT)** con una **expiración corta** de 1 hora para la autenticación de usuarios, asegurando que las sesiones no permanezcan activas indefinidamente.

#### **3**: **Validación de datos**  
- Validación tanto en **frontend** como en **backend** para asegurar que los datos recibidos no puedan ser utilizados para **inyectar código SQL** o realizar otros tipos de ataques.

---

### **📱 Usabilidad**
#### **4**: **Tiempo de carga de páginas**  
- Las **páginas** deben cargar en menos de **2 segundos** para una experiencia de usuario fluida y rápida.

#### **5**: **Compatibilidad con dispositivos móviles**  
- La interfaz debe ser **responsiva**, garantizando la correcta visualización y usabilidad en dispositivos móviles y tabletas.

---

### **🧰 Mantenibilidad**
#### **6**: **Uso de migraciones y seeders**  
- Implementar **migraciones** y **seeders** (scripts como "ronnysan") para la **inicialización de datos de prueba**, permitiendo una gestión eficiente de la base de datos.

---

### **⚙️ Rendimiento**
#### **7**: **Soporte de usuarios concurrentes**  
- El sistema debe soportar al menos **10 usuarios concurrentes** sin experimentar **degradación notable en el rendimiento**, manteniendo la fluidez en operaciones como ventas y gestión de productos.

#### **8**: **Base de datos optimizada**  
- La **base de datos** debe estar optimizada para consultas rápidas, especialmente para operaciones críticas como el registro de ventas y la búsqueda de productos.

---

### **🚀 Despliegue**
#### **9**: **Compatibilidad con entornos Linux/Windows**  
- El sistema debe ser **compatible** con **entornos de despliegue Linux** y **Windows**, para facilitar su implementación en servidores de diferentes plataformas.

#### **10**: **Uso de variables de entorno**  
- El sistema debe utilizar **variables de entorno** para almacenar configuraciones sensibles, como **credenciales de base de datos**, para una mayor seguridad y flexibilidad en diferentes entornos de despliegue.


---

<br>

# 🔷 Diagramas Técnicos

## 🧑‍💻 Diagrama de casos de uso

### 🦸 Super Usuario y Admin

```mermaid
graph LR
  %% ========== ACTOR ==========
  SuperAdmin[("👑 Superusuario/Admin")]

  %% ========== CASOS DE USO ==========
  subgraph "🔐 Gestión de Accesos"
    Login[Iniciar Sesión]
    CambiarPass[Cambiar Contraseña]
  end

  subgraph "💻 Administración Total"
    GestionAll[Gestionar:<br/>- Usuarios<br/>- Roles<br/>- Métodos Pago<br/>- Productos<br/>- Clientes<br/>- Ventas<br/>- Logs]
  end

  subgraph "📊 Operaciones Comunes"
    Dashboard[Dashboard]
  end

  %% ========== CONEXIONES ==========
  SuperAdmin --> Login
  SuperAdmin --> GestionAll
  SuperAdmin --> Dashboard
  SuperAdmin --> CambiarPass

  %% ========== ESTILOS ===========
  classDef admin fill:#4338ca,stroke:#ffffff
  class SuperAdmin admin

```
---

<br>


### 👨‍⚕️ Farmaceutico

```mermaid
graph LR
  %% ========== ACTOR ==========
  Farma[("👨‍⚕️ Farmacéutico")]

  %% ========== CASOS DE USO ==========
  subgraph "🔐 Gestión de Accesos"
    Login[Iniciar Sesión]
    CambiarPass[Cambiar Contraseña]
    EditarPerfil[Editar Perfil]
  end

  subgraph "📊 Operaciones Comunes"
    Dashboard[Dashboard]
    ProdView[Buscar Productos]
  end

  subgraph "💰 Procesos de Ventas"
    VentaOps[Operaciones:<br/>- Registrar<br/>- Ver<br/>- Eliminar Ventas]
  end

  %% ========== CONEXIONES ==========
  Farma --> Login
  Farma --> ProdView
  Farma --> Dashboard
  Farma --> EditarPerfil
  Farma --> CambiarPass
  Farma --> VentaOps

  %% ========== ESTILOS ===========
  classDef farma fill:#16a34a,stroke:#388e3c
  class Farma farma


```
---

<br>


### 👨‍⚕️ DCU - Cajero

```mermaid
graph LR
  %% ========== ACTOR ==========
  Cajero[("💵 Cajero")]

  %% ========== CASOS DE USO ==========
  subgraph "🔐 Gestión de Accesos"
    Login[Iniciar Sesión]
  end

  subgraph "📊 Operaciones Comunes"
    Dashboard[Dashboard]
    ProdView[Buscar Productos]
  end

  subgraph "💰 Procesos de Ventas"
    VentaOps[Operaciones:<br/>- Registrar<br/>- Ver<br/>- Eliminar Ventas]
  end

  %% ========== CONEXIONES ==========
  Cajero --> Login
  Cajero --> VentaOps
  Cajero --> ProdView
  Cajero --> Dashboard

  %% ========== ESTILOS ===========
  classDef cajero fill:#f97316,stroke:#ffb300
  class Cajero cajero

```
---

<br>


### 🖥️ DCU - Sistema

```mermaid
graph LR
  %% ========== ACTOR ==========
  Sistema[("🖥️ Sistema")]

  %% ========== CASOS DE USO ==========
  subgraph "⚙️ Procesos Automáticos"
    Encriptar[Encriptar Datos]
    ActualizarStock[Actualizar Stock]
    GenerarLogs[Generar Logs]
  end

  %% ========== CONEXIONES ==========
  Sistema --> Encriptar
  Sistema --> ActualizarStock
  Sistema --> GenerarLogs

  %% ========== ESTILOS ===========
  classDef sistema fill:#0284c7,stroke:#ab47bc
  class Sistema sistema


```
---

<br>




## ➡️ Diagrama de secuencia
### 🔐 Proceso de login

```mermaid
sequenceDiagram
    participant U as Usuario
    participant F as Frontend
    box Backend
        participant R as Router
        participant C as Controller
        participant S as Service
        participant D as DB
    end

    U->>F: Login
    F->>R: POST /login
    R->>C: Route
    C->>S: validate()
    S->>D: Query
    D->>S: Data
    S->>S: createJWT()
    S->>C: Token
    C->>C: setCookie()
    C->>F: 200+Cookie
    F->>U: Dashboard
```
<br>

---

<br>

### 💳 Proceso de compra

```mermaid
sequenceDiagram
    participant Usuario as Vendedor
    participant Frontend
    box Backend
        participant Router
        participant Controller
        participant Service
        participant Logger
        participant DB
    end

    Usuario->>Frontend: 1. Agrega productos y cliente (stock ya validado)
    Frontend->>Router: 2. POST /api/ventas (con JWT)
    Router->>Controller: 3. Procesar solicitud
    Controller->>Service: 4. Registrar venta
    Service->>DB: 5. Guardar venta
    DB-->>Service: 6. ID generado
    Service->>Logger: 7. Log venta exitosa
    Controller->>Router: 8. 201 Created + ID
    Router->>Frontend: 9. Confirmación
    Frontend->>Usuario: 10. "Venta registrada"



```





---

<br>

### 🕐 Proceso de logs

```mermaid
sequenceDiagram
    participant Usuario
    participant Frontend
    box Backend
        participant Router
        participant Controller
        participant Service
        participant Logger
        participant DB
    end

    Usuario->>Frontend: 1. Realiza acción (agregar/editar/eliminar)
    Frontend->>Router: 2. Enviar solicitud (con JWT)
    Router->>Controller: 3. Procesar acción
    Controller->>Service: 4. Ejecutar acción en DB
    Service->>DB: 5. Afectar tabla (insert/update/delete)
    DB-->>Service: 6. Confirmación

    %% Registro de log
    Service->>Logger: 7. Registrar log (usuarioID, acción, tabla)
    Logger->>DB: 8. Guardar log
    DB-->>Logger: 9. Log registrado

    Controller->>Router: 10. 200 OK
    Router->>Frontend: 11. Respuesta


```



---

<br>

### 🚪 Proceso de cerrar sesion

```mermaid
sequenceDiagram
    actor Usuario as Vendedor/Admin
    participant Frontend as Frontend
    box Backend
        participant Router as Auth Router
        participant Controller as Auth Controller
        participant Logger as Logger Service
    end

    Usuario->>+Frontend: 1. Clic en "Cerrar sesión"
    Frontend->>+Router: 2. POST /api/auth/logout
    Router->>+Controller: 3. Procesar solicitud

    Controller->>+Logger: 4. Registrar log de cierre de sesión
    Logger-->>-Controller: 5. Log registrado

    Controller->>Controller: 6. Eliminar cookie
    Controller-->>-Router: 7. Respuesta vacía 200
    Router-->>-Frontend: 8. 200 OK

    Frontend->>Frontend: 9. Verifica cookie
    Frontend-->>-Usuario: 10. Redirigir a /login

```
---

<br>

# 🧱 Modelado de Base de datos
🔗 [El modelado en DrawSQL](https://drawsql.app/teams/main-88/diagrams/farmacia-nova-salud)

---

<br>

# 🏗️ Arquitectura del Proyecto

📐 El Patron **MSCR**:  

**Modelo ⬅️ Service ⬅️ Controlador ⬅️ Router**

---

<br>

# 📁 Estructura del Proyecto Backend

```mermaid
graph LR
  A[FULLSTACK-RONAL]

  A --> B[Backend]
  B --> B1[config]
  B1 --> B1a[config.js<br/>Carga variables .env]
  B1 --> B1b[db.js<br/>Conexión a la base de datos]

  B --> B2[database]
  B2 --> B2a[migrations<br/>Archivos de migración]
  B2 --> B2b[seeders<br/>Datos iniciales]

  B --> B3[models<br/>Esquemas de datos]
  B --> B4[services<br/>Lógica de negocio]
  B --> B5[controllers<br/>Manejan lógica de rutas]
  B --> B6[routes<br/>Definen rutas de la API]

  B --> B7[ronnysan.js<br/>CLI personalizado estilo Artisan]
  
  B --> B8[testConnection.js<br/>Prueba conexión con DB]

  B --> B9[server.js<br/>Servidor Express principal]
  B --> B10[.env<br/>Variables de entorno]

  A --> C[Frontend]
 

  A --> D[docker-compose.yml<br/>Contenedores Docker]
  A --> E[.gitignore<br/>Ignorar archivos en Git]
  A --> F[README.md<br/>Documentación del proyecto]

```

---

<br>


# 📁 Estructura del Proyecto Frontend

```mermaid
graph LR
  A[frontend]
  
  A --> B[public]
  B --> B1[background-farmacia.jpg]
  
  A --> C[src]
  C --> C1[api]
  C1 --> C1a[axiosInstance.js<br/>Configuración Axios para el backend]
  
  C --> C2[assets]
  C2 --> C2a[background-farmacia.jpg]
  
  C --> C3[components]
  C3 --> C3a[Header.jsx<br/>Componente de cabecera]
  C3 --> C3b[Sidebar.jsx<br/>Menú lateral]
  
  C --> C4[layouts]
  C4 --> C4a[MainLayout.jsx<br/>Layout para rutas protegidas]
  
  C --> C5[pages]
  C5 --> C5a[Autenticación]
  C5a --> C5a1[LoginPage.jsx]
  
  C5 --> C5b[Usuarios]
  C5b --> C5b1[UserForm.jsx]
  C5b --> C5b2[UserPasswordForm.jsx]
  C5b --> C5b3[UsersPage.jsx]
  
  C5 --> C5c[Clientes]
  C5c --> C5c1[CustomerForm.jsx]
  C5c --> C5c2[CustomersPage.jsx]
  
  C5 --> C5d[Productos]
  C5d --> C5d1[ProductForm.jsx]
  C5d --> C5d2[ProductsPage.jsx]
  C5d --> C5d3[CategoriesPage.jsx]
  C5d --> C5d4[CategoryForm.jsx]
  
  C5 --> C5e[Ventas]
  C5e --> C5e1[SalesForm.jsx]
  C5e --> C5e2[SaleDetailsForm.jsx]
  C5e --> C5e3[SalesPage.jsx]
  
  C5 --> C5f[Configuraciones]
  C5f --> C5f1[RolesPage.jsx]
  C5f --> C5f2[RoleForm.jsx]
  C5f --> C5f3[PaymentMethodsPage.jsx]
  C5f --> C5f4[PaymentMethodsForm.jsx]
  C5f --> C5f5[LogsPage.jsx]
  
  C5 --> C5g[HomePage.jsx]
  
  C --> C6[services]
  C6 --> C6a[logService.js<br/>Registro de logs en DB]
  
  C --> C7[App.css]
  C --> C8[App.jsx]
  C --> C9[index.css]
  C --> C10[main.jsx]
  
  A --> D[index.html]
  A --> E[package-lock.json]
  A --> F[package.json]
  A --> G[vite.config.js]

```

---

<br>


## 🧑‍💻 Ronnysan CLI (Mi Artisan Personal)

Inspirado en **Laravel Artisan**, creé **ronnysan**, un CLI personalizado para generar controladores, modelos y servicios rápidamente en el backend con Node.js.

<br>

### 📂 Comandos para generar archivos

Aquí algunos ejemplos de cómo utilizar **ronnysan** para crear diferentes archivos en el backend con el modelo `User`:

#### 🧩 Crear un **Model**
```bash
node ronnysan.js make:model User
```
> Crea un modelo User en el backend, que representará la estructura de la tabla users en la base de datos.

<br>

#### 🛠️ Crear un **Service**
```bash
node ronnysan.js make:service User
```
> Crea un archivo User Service que contendrá la lógica de negocio y la interacción con el modelo User.

<br>

#### 🎮 Crear un **Controller**
```bash
node ronnysan.js make:controller User
```
> Crea un controlador User que gestionará las rutas y acciones relacionadas con el modelo User.

<br>

#### 🔗 Crear un **Router**
```bash
node ronnysan.js make:router User
```
> Crea un archivo de enrutador User que define las rutas para las acciones CRUD del modelo User.

<br>

#### 🗄️ Crear una **Migration**
```bash
node ronnysan.js make:migration User
```
> Crea un archivo de migración para la tabla User, que te permitirá crear o modificar la estructura de la base de datos.

<br>

#### 🌱 Crear un **Seeder**
```bash
node ronnysan.js make:seeder User
```
> Crea un archivo Seeder para User, que te permitirá insertar datos de ejemplo o predeterminados en la base de datos.

<br>

### 🚀 Comandos para migraciones
Los comandos de migración nos permiten gestionar la estructura de la base de datos, creando o eliminando tablas según lo definido en los archivos de migración.

#### ⬆️ Ejecutar una **Migracion**
```bash
node ronnysan.js migrate:up usersTableMigration.js
```
> Este comando ejecuta la migración User, lo que construye la tabla correspondiente en la base de datos según lo definido en el archivo de migración.

<br>

#### ⬇️ Revertir una **Migracion**
```bash
node ronnysan.js migrate:down usersTableMigration.js
```
> Este comando revierte la migración User, eliminando la tabla o los cambios hechos en la base de datos.


<br>

### 🌱 Comandos para seeder
Tambien podemos ejecutar seeders con los siguientes comandos:

#### ⬆️ Ejecutar un **Seeder**
```bash
node ronnysan.js seeder:up userTableSeeder.js
```
> Este comando ejecuta el seeder User, lo que inserta datos establecidos en el archivo seeder en la base de datos, como registros de ejemplo para la tabla User.

<br>

#### ⬇️ Revertir un **Seeder**
```bash
node ronnysan.js seeder:down userTableSeeder.js
```
> Este comando revierte el seeder User, eliminando los datos que se insertaron en la base de datos.

---

<br>

# ✅ PROYECTO EN FUNCIONAMIENTO AQUI:
👉 [Ver proyecto](http://localhost:5173/)
