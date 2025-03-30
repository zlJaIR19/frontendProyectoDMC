# Estructura de la Base de Datos - Cafetea Perú

## Diagrama de Entidad-Relación

```
+---------------+       +---------------+       +---------------+
|   USUARIO     |       |    ORDEN      |       |   PRODUCTO    |
+---------------+       +---------------+       +---------------+
| id            |<----->| id            |       | id            |
| username      |       | usuarioId     |       | nombre        |
| password      |       | fecha_pedido  |       | descripcion   |
| nombre        |       | estado        |       | precio        |
| email         |       |               |       | imagen_url    |
| rol           |       |               |       | categoriaId   |
+---------------+       +---------------+       | fecha_creacion|
                               |                +---------------+
                               |                        ^
                               v                        |
                        +---------------+               |
                        | DETALLE_ORDEN |               |
                        +---------------+               |
                        | id            |---------------+
                        | ordenId       |
                        | productoId    |
                        | cantidad      |
                        | precio_unitario|
                        | subtotal      |
                        +---------------+
```

## Descripción de Tablas

### Tabla: `usuario`

Almacena la información de los usuarios del sistema, tanto clientes como administradores.

| Campo      | Tipo         | Descripción                                     |
|------------|--------------|------------------------------------------------|
| id         | int          | Identificador único del usuario (PK)           |
| username   | varchar(50)  | Nombre de usuario para inicio de sesión        |
| password   | varchar(255) | Contraseña encriptada                          |
| nombre     | varchar(100) | Nombre completo del usuario                    |
| email      | varchar(100) | Correo electrónico                             |
| rol        | varchar(20)  | Rol del usuario ('admin' o 'cliente')          |

### Tabla: `producto`

Contiene el catálogo de productos disponibles para la venta.

| Campo         | Tipo         | Descripción                                  |
|---------------|--------------|----------------------------------------------|
| id            | int          | Identificador único del producto (PK)        |
| nombre        | varchar(100) | Nombre del producto                          |
| descripcion   | text         | Descripción detallada del producto           |
| precio        | decimal(10,2)| Precio unitario del producto                 |
| imagen_url    | varchar(255) | Ruta relativa a la imagen del producto       |
| categoriaId   | int          | Identificador de la categoría (FK)           |
| fecha_creacion| timestamp    | Fecha y hora de creación del producto        |

### Tabla: `orden`

Registra las órdenes realizadas por los clientes.

| Campo        | Tipo         | Descripción                                   |
|--------------|--------------|-----------------------------------------------|
| id           | int          | Identificador único de la orden (PK)          |
| usuarioId    | int          | ID del usuario que realizó la orden (FK)      |
| fecha_pedido | timestamp    | Fecha y hora en que se realizó la orden       |
| estado       | varchar(20)  | Estado de la orden ('Pendiente', 'Enviado', 'Completado') |

### Tabla: `detalle_orden`

Almacena los detalles de productos incluidos en cada orden.

| Campo          | Tipo         | Descripción                                 |
|----------------|--------------|---------------------------------------------|
| id             | int          | Identificador único del detalle (PK)        |
| ordenId        | int          | ID de la orden a la que pertenece (FK)      |
| productoId     | int          | ID del producto ordenado (FK)               |
| cantidad       | int          | Cantidad de unidades del producto           |
| precio_unitario| decimal(10,2)| Precio unitario al momento de la compra     |
| subtotal       | decimal(10,2)| Calculado automáticamente (precio_unitario * cantidad) |

## Relaciones

1. **Usuario - Orden**: Un usuario puede tener múltiples órdenes, pero cada orden pertenece a un único usuario.
   - Relación: Uno a muchos (1:N)
   - Clave foránea: `orden.usuarioId` referencia a `usuario.id`

2. **Orden - Detalle_Orden**: Una orden puede contener múltiples detalles de productos, pero cada detalle pertenece a una única orden.
   - Relación: Uno a muchos (1:N)
   - Clave foránea: `detalle_orden.ordenId` referencia a `orden.id`

3. **Producto - Detalle_Orden**: Un producto puede aparecer en múltiples detalles de órdenes, y cada detalle de orden se refiere a un único producto.
   - Relación: Uno a muchos (1:N)
   - Clave foránea: `detalle_orden.productoId` referencia a `producto.id`

## Notas Importantes

- La columna `subtotal` en la tabla `detalle_orden` es una columna generada automáticamente por la base de datos, calculada como el producto de `cantidad` y `precio_unitario`.
- Los estados de orden válidos son: 'Pendiente', 'Enviado' y 'Completado'.
- Las imágenes de productos se almacenan como rutas relativas en la columna `imagen_url`, apuntando a archivos en la carpeta `/assets/` del frontend.

## Configuración de Conexión

La aplicación se conecta a la base de datos PostgreSQL alojada en Render mediante la siguiente URL de conexión:

```
DATABASE_URL=postgresql://cafetea:[PASSWORD]@dpg-cvkc5qk9c44c738pn690-a.ohio-postgres.render.com:5432/tienda_msb5
```

> Nota: Por razones de seguridad, la contraseña real ha sido omitida en esta documentación.
