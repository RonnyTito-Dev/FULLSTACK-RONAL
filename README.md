# 🚀 Proyecto Fullstack: **FULLSTACK RONAL TITO**

Este proyecto es una aplicación Fullstack que combina un frontend desarrollado
con **HTML, CSS y React** junto con un backend construido con **Node.js** y
**Express**. Está diseñado para aprender y practicar el desarrollo Fullstack de
aplicaciones web.

<br>

## 📚 Tabla de Contenidos

- [📝 Descripción](#-descripción)
- [🧰 Tecnologías](#-tecnologías)
- [🏗️ Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Instrucciones de Instalación](#-instrucciones-de-instalación)
- [🚀 Uso](#-uso)
- [👨‍💻 Desarrollo](#-desarrollo)

<br>

## 📝 1. Descripción

Este proyecto tiene como objetivo proporcionar una solución **Fullstack** para
aplicaciones web modernas.  
El **frontend** está construido con **React**, lo que permite una experiencia de
usuario dinámica y rápida.  
El **backend**, basado en **Express**, maneja las peticiones y respuestas del
servidor, y está configurado con **Node.js**.

<br>

## 🧰 2. Tecnologías

### 🖥️ Frontend:

- 🌐 HTML
- 🎨 CSS
- ⚛️ React

### 🖧 Backend:

- 🟢 Node.js
- 🚂 Express

### 🗄️ Base de Datos:

- 🐘 PostgreSQL

<br>

## 🏗️ 3. Arquitectura del Proyecto

El proyecto sigue el patrón de diseño **MVC**:  
**Modelo - Vista - Controlador** 🧱👀🧠

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


<br>

## 📁 4. Estructura del Proyecto

La estructura está organizada de la siguiente forma:

### 📦 Backend

### 💻 Frontend

<br>

## 🧑 5. Ronnysan CLI (Mi propio Artisan)

Viniendo de **Laravel**, extrañaba las herramientas de línea de comandos como **Artisan**.  
Así que decidí crear mi propio CLI personalizado: **ronnysan**, una herramienta básica pero poderosa para generar archivos del backend en mi stack con **Node.js** y **Express**.

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
node ronnysan.js make:router User
```
> Crea un archivo Seeder para User, que te permitirá insertar datos de ejemplo o predeterminados en la base de datos.

<br>

### 🚀 Comandos para migraciones
Los comandos de migración nos permiten gestionar la estructura de la base de datos, creando o eliminando tablas según lo definido en los archivos de migración.

#### ⬆️ Ejecutar una **Migracion**
```bash
node ronnysan.js migrate:up User
```
> Este comando ejecuta la migración User, lo que construye la tabla correspondiente en la base de datos según lo definido en el archivo de migración.

<br>

#### ⬇️ Revertir una **Migracion**
```bash
node ronnysan.js migrate:down User
```
> Este comando revierte la migración User, eliminando la tabla o los cambios hechos en la base de datos.


<br>

### 🌱 Comandos para seeder
Tambien podemos ejecutar seeders con los siguientes comandos:

#### ⬆️ Ejecutar un **Seeder**
```bash
node ronnysan.js seeder:up User
```
> Este comando ejecuta el seeder User, lo que inserta datos establecidos en el archivo seeder en la base de datos, como registros de ejemplo para la tabla User.

<br>

#### ⬇️ Revertir un **Seeder**
```bash
node ronnysan.js seeder:down User
```
> Este comando revierte el seeder User, eliminando los datos que se insertaron en la base de datos.

<br>

## 🔧 6. Instrucciones de Instalación

📌 _Próximamente..._


<br>

## 🚀 7. Uso

📌 _Próximamente..._


<br>

## 👨‍💻 8. Desarrollo

📌 _Próximamente..._


