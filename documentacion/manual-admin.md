# Manual de Usuario - Administrador

## Cafetea Perú - Panel de Administración

### Índice
1. [Introducción](#introducción)
2. [Acceso al Panel de Administración](#acceso-al-panel-de-administración)
3. [Gestión de Productos](#gestión-de-productos)
4. [Gestión de Órdenes](#gestión-de-órdenes)
5. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

Bienvenido al **Panel de Administración de Cafetea Perú**. Este manual te guiará a través de las funcionalidades disponibles para usuarios con rol de administrador, permitiéndote gestionar productos y órdenes de manera eficiente.

## Acceso al Panel de Administración

### Iniciar Sesión como Administrador

1. Accede a la página principal de Cafetea Perú.
2. Haz clic en el botón "Iniciar Sesión" ubicado en la esquina superior derecha.
3. En la pantalla de inicio de sesión:
   - Ingresa tu nombre de usuario y contraseña de administrador.
   - Selecciona la opción "Administrador" en el selector de rol.
   - Haz clic en "Iniciar Sesión".

![Pantalla de Inicio de Sesión](./imagenes/login-admin.png)

### Navegación por el Panel de Administración

Una vez que hayas iniciado sesión como administrador, tendrás acceso a las siguientes secciones en la barra de navegación:

- **Órdenes**: Gestión de todas las órdenes realizadas por los clientes.
- **Gestionar Productos**: Administración del catálogo de productos.
- **Cerrar Sesión**: Para salir de tu cuenta de administrador.

## Gestión de Productos

### Ver Todos los Productos

1. Haz clic en "Gestionar Productos" en la barra de navegación.
2. Verás una tabla con todos los productos existentes, mostrando:
   - Imagen del producto
   - Nombre
   - Categoría
   - Precio
   - Acciones disponibles (Editar, Eliminar)

### Crear un Nuevo Producto

1. En la página de gestión de productos, haz clic en el botón "Crear Nuevo Producto".
2. Completa el formulario con los siguientes datos:
   - Nombre del producto
   - Descripción
   - Precio
   - Categoría
   - Ruta de imagen (puedes seleccionar una imagen predeterminada del selector)
3. Haz clic en "Guardar" para crear el producto.

![Formulario de Creación de Producto](./imagenes/crear-producto.png)

### Editar un Producto Existente

1. En la tabla de productos, haz clic en el botón "Editar" junto al producto que deseas modificar.
2. Se abrirá el formulario con los datos actuales del producto.
3. Realiza los cambios necesarios.
4. Haz clic en "Actualizar" para guardar los cambios.

### Eliminar un Producto

1. En la tabla de productos, haz clic en el botón "Eliminar" junto al producto que deseas eliminar.
2. Confirma la acción en el cuadro de diálogo que aparecerá.
3. El producto será eliminado permanentemente del catálogo.

## Gestión de Órdenes

### Ver Todas las Órdenes

1. Haz clic en "Órdenes" en la barra de navegación.
2. Verás una lista de todas las órdenes realizadas por los clientes, mostrando:
   - ID de la orden
   - Fecha del pedido
   - Cliente que realizó la orden
   - Estado de la orden (Pendiente, Enviado, Completado)
   - Acciones disponibles (Ver detalles)

### Ordenar y Filtrar la Lista de Órdenes

- Puedes ordenar las órdenes por fecha haciendo clic en el botón "Ordenar por Fecha".
- Puedes ordenar las órdenes por cliente haciendo clic en el botón "Ordenar por Cliente".

### Ver Detalles de una Orden

1. En la lista de órdenes, haz clic en "Ver Detalles" junto a la orden que deseas examinar.
2. Se abrirá una página con información detallada sobre la orden:
   - Información del cliente
   - Fecha del pedido
   - Estado actual
   - Lista de productos ordenados con:
     - Nombre del producto
     - Precio unitario
     - Cantidad
     - Subtotal

![Detalles de Orden](./imagenes/detalles-orden.png)

### Actualizar el Estado de una Orden

1. En la página de detalles de la orden, selecciona el nuevo estado en el menú desplegable.
2. Haz clic en "Actualizar Estado" para guardar los cambios.
3. El sistema actualizará el estado de la orden y mostrará un indicador visual del nuevo estado.

## Preguntas Frecuentes

### ¿Por qué aparecen órdenes de prueba en el sistema?
Las órdenes de prueba se mantienen en el sistema como evidencia del proceso de desarrollo y pruebas. Estas órdenes pueden ser útiles para demostrar la funcionalidad del sistema a nuevos usuarios.

### ¿Puedo crear órdenes manualmente desde el panel de administración?
Actualmente, las órdenes solo pueden ser creadas por los clientes a través de la interfaz de compra. Los administradores pueden ver y gestionar las órdenes existentes, pero no crear nuevas.

### ¿Cómo se manejan las imágenes de los productos?
El sistema utiliza imágenes almacenadas en la carpeta `/assets/products/` del proyecto. Al crear o editar un producto, puedes seleccionar una imagen predeterminada del selector o ingresar manualmente la ruta relativa a una imagen existente.

---

© 2025 Cafetea Perú - Todos los derechos reservados
