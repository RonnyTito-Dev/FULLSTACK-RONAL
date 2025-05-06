# Requerimientos - Sistema de Gestión para Boticas "Nova Salud"

## **Requerimientos Funcionales (RF)**

### **Autenticación y Seguridad**
- **RF01**: Sistema de login con credenciales (email y contraseña).  
- **RF02**: Encriptación de contraseñas (bcrypt) antes de almacenarlas en la base de datos.  
- **RF03**: Protección de rutas del backend con JWT y cookies HTTP-only.  

### **Gestión de Productos**
- **RF04**: CRUD completo de productos (Crear, Leer, Actualizar, Eliminar).  
  - Campos mínimos: nombre, descripción, precio, stock, categoría, código de barras.  
- **RF05**: Búsqueda/filtrado de productos por nombre, categoría o código.  

### **Gestión de Clientes**
- **RF06**: CRUD completo de clientes (Crear, Leer, Actualizar, Eliminar).  
  - Campos mínimos: nombre, DNI, celular, direccionn etc.  

### **Ventas**
- **RF07**: Registro de ventas con:  
  - Selección de cliente.  
  - Lista de productos vendidos (cantidad, precio unitario, subtotal).  
  - Cálculo automático de total. 
- **RF08**: Actualizacion automatica del stock al registrar una venta.  

### **Interfaz de Usuario**
- **RF09**: Dashboard con resumen o contador de productos, clientes, ventas etc.  
- **RF10**: Diseño intuitivo.  


---

<br>

## **Requerimientos No Funcionales (RNF)**

### **Seguridad**
- **RNF01**: Cookies HTTP-only para evitar ataques XSS Cross-Site Scripting.  
- **RNF02**: JWT con expiración corta 1 para autenticación.  
- **RNF03**: Validación de datos en frontend y backend para evitar inyecciones SQL.  

### **Usabilidad**
- **RNF04**: Tiempo de carga de páginas menor a 2 segundos.  
- **RNF05**: Interfaz compatible con dispositivos móviles.  

### **Mantenibilidad**
- **RNF06**: Uso de migraciones y seeders (script "ronnysan") para inicializar datos de prueba.  


### **Rendimiento**
- **RNF07**: Soporte para al menos 50 usuarios concurrentes sin degradación notable.  
- **RNF08**: Base de datos optimizada.  

### **Despliegue**
- **RNF9**: Compatibilidad con entornos Linux/Windows para despliegue.  
- **RNF10**: Uso de variables de entorno para configuración sensible (ej: conexión a DB).  

---
 