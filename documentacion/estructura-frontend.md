# Estructura del Frontend - Cafetea Perú

## Organización de Carpetas

La aplicación Angular sigue una estructura modular organizada por funcionalidades:

```
src/
├── app/
│   ├── core/                 # Servicios principales, guards, interceptors
│   │   ├── auth/             # Servicios y guards de autenticación
│   │   ├── services/         # Servicios compartidos (productos, órdenes)
│   │   └── interceptors/     # Interceptores HTTP
│   │
│   ├── features/             # Componentes específicos por funcionalidad
│   │   ├── admin/            # Componentes exclusivos para administradores
│   │   │   ├── orden-list/   # Listado de órdenes
│   │   │   ├── orden-detail/ # Detalle de una orden específica
│   │   │   └── producto-management/ # Gestión de productos
│   │   │
│   │   ├── auth/             # Componentes de autenticación
│   │   │   ├── login/        # Inicio de sesión
│   │   │   └── register/     # Registro de usuarios
│   │   │
│   │   └── productos/        # Componentes relacionados con productos
│   │       └── producto-list/ # Listado de productos para clientes
│   │
│   ├── shared/               # Componentes, modelos y utilidades compartidas
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── nav/          # Barra de navegación
│   │   │   └── footer/       # Pie de página
│   │   │
│   │   ├── models/           # Interfaces y modelos de datos
│   │   │   ├── producto.model.ts
│   │   │   ├── orden.model.ts
│   │   │   ├── detalle-orden.model.ts
│   │   │   └── usuario.model.ts
│   │   │
│   │   └── utils/            # Utilidades y helpers
│   │
│   ├── app-routing.module.ts # Configuración de rutas principales
│   ├── app.component.ts      # Componente raíz
│   └── app.module.ts         # Módulo principal
│
├── assets/                   # Recursos estáticos
│   ├── products/             # Imágenes de productos
│   └── placeholder.jpg       # Imagen de respaldo
│
└── environments/             # Configuraciones por entorno
    ├── environment.ts        # Desarrollo
    └── environment.prod.ts   # Producción
```

## Modelos de Datos

### Producto (`producto.model.ts`)

```typescript
export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url: string;
  categoriaId?: number;
  fecha_creacion?: Date;
  detallesOrden?: DetalleOrden[];
}
```

### Orden (`orden.model.ts`)

```typescript
export interface Orden {
  id?: number;
  usuarioId?: number;
  fecha_pedido: Date;
  estado: string;
  detallesOrden?: DetalleOrden[];
  usuario?: Usuario;
}
```

### Detalle de Orden (`detalle-orden.model.ts`)

```typescript
export interface DetalleOrden {
  id?: number;
  ordenId: number;
  productoId: number;
  cantidad: number;
  precio_unitario: number;
  subtotal?: number;
  producto?: Producto;
}
```

### Usuario (`usuario.model.ts`)

```typescript
export interface Usuario {
  id?: number;
  username: string;
  password?: string;
  nombre: string;
  email: string;
  rol: string;
  ordenes?: Orden[];
}
```

## Flujos Principales

### Autenticación

1. El usuario accede a la página de inicio de sesión (`/auth/login`)
2. Selecciona su rol (Cliente o Administrador)
3. Ingresa sus credenciales
4. El servicio de autenticación valida las credenciales contra la API
5. Si son válidas, se almacena el token JWT y la información del usuario en localStorage
6. Se redirige al usuario según su rol:
   - Clientes: a la lista de productos (`/productos`)
   - Administradores: a la lista de órdenes (`/admin/ordenes`)

### Flujo de Cliente

1. El cliente navega por el catálogo de productos
2. Puede buscar productos específicos usando la barra de búsqueda
3. Al hacer clic en "Comprar" en un producto:
   - Se crea una nueva orden con estado "Pendiente"
   - Se muestra una notificación de confirmación
   - La orden queda disponible para ser gestionada por un administrador

### Flujo de Administrador

1. El administrador accede al panel de administración
2. Puede ver todas las órdenes realizadas por los clientes
3. Puede ordenar las órdenes por fecha o por cliente
4. Al hacer clic en "Ver Detalles" de una orden:
   - Puede ver los productos incluidos en la orden
   - Puede actualizar el estado de la orden
5. En la sección "Gestionar Productos":
   - Puede ver todos los productos existentes
   - Puede crear nuevos productos
   - Puede editar o eliminar productos existentes

## Servicios Principales

### AuthService

Gestiona la autenticación, registro y control de acceso basado en roles.

Métodos principales:
- `login(username: string, password: string, rol: string): Observable<any>`
- `register(usuario: Usuario): Observable<any>`
- `logout(): void`
- `isLoggedIn(): boolean`
- `isAdmin(): boolean`
- `isClient(): boolean`

### ProductoService

Gestiona las operaciones relacionadas con productos.

Métodos principales:
- `getProductos(): Observable<Producto[]>`
- `getProducto(id: number): Observable<Producto>`
- `createProducto(producto: Producto): Observable<Producto>`
- `updateProducto(id: number, producto: Producto): Observable<Producto>`
- `deleteProducto(id: number): Observable<any>`

### OrdenService

Gestiona las operaciones relacionadas con órdenes.

Métodos principales:
- `getOrdenes(): Observable<Orden[]>`
- `getOrden(id: number): Observable<Orden>`
- `createOrden(orden: Orden): Observable<Orden>`
- `updateOrdenEstado(id: number, estado: string): Observable<Orden>`

## Componentes Destacados

### NavComponent

Barra de navegación que muestra diferentes opciones según el rol del usuario:
- Sin sesión: "Iniciar Sesión"
- Cliente: "Productos", "Cerrar Sesión"
- Administrador: "Órdenes", "Gestionar Productos", "Cerrar Sesión"

### ProductoListComponent

Muestra el catálogo de productos para los clientes con funcionalidad de búsqueda y compra directa.

### OrdenListComponent

Muestra la lista de órdenes para los administradores con opciones de ordenación y acceso a detalles.

### OrdenDetailComponent

Muestra los detalles de una orden específica, incluyendo productos, cantidades, precios y permite actualizar el estado.

### ProductoManagementComponent

Permite a los administradores gestionar el catálogo de productos (crear, editar, eliminar).

## Rutas Principales

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'productos', component: ProductoListComponent },
  { 
    path: 'admin', 
    canActivate: [AdminGuard],
    children: [
      { path: 'ordenes', component: OrdenListComponent },
      { path: 'ordenes/:id', component: OrdenDetailComponent },
      { path: 'productos', component: ProductoManagementComponent }
    ] 
  },
  { path: '**', redirectTo: '/productos' }
];
```

## Guards de Seguridad

### AdminGuard

Protege las rutas de administrador, verificando que el usuario tenga rol "admin".

### AuthGuard

Protege las rutas que requieren autenticación, verificando que el usuario esté logueado.

## Manejo de Imágenes

El sistema utiliza un enfoque simplificado para la gestión de imágenes:

1. Las imágenes se almacenan en la carpeta `/assets/products/` del proyecto Angular
2. Los usuarios administradores pueden seleccionar imágenes predeterminadas de un selector o ingresar manualmente la ruta
3. El sistema completa automáticamente la ruta base ("/assets/")
4. Se implementa un manejo de errores que muestra una imagen de placeholder si la original no se encuentra

## Estilos y UI

La aplicación utiliza Tailwind CSS 4 para los estilos, con un diseño responsivo que se adapta a diferentes tamaños de pantalla.

Características principales:
- Paleta de colores basada en tonos ámbar que coinciden con la identidad de marca
- Diseño de tarjetas para productos con efectos de hover
- Indicadores visuales para estados de órdenes (colores diferentes)
- Mensajes de confirmación con diseño personalizado
- Formularios con validación visual
