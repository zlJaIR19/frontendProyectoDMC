# Cafetea Perú - Aplicación Web

## Descripción del Proyecto

Cafetea Perú es una aplicación web completa para la gestión y venta de productos de café peruano. La plataforma permite a los clientes explorar y comprar productos, mientras que los administradores pueden gestionar productos y órdenes a través de un panel de administración dedicado.

## Arquitectura

El proyecto está construido con una arquitectura de tres capas:

1. **Frontend**: Aplicación Angular con Tailwind CSS
2. **Backend**: API RESTful desarrollada con NestJS
3. **Base de Datos**: PostgreSQL alojada en Render

![Arquitectura del Proyecto](./docs/arquitectura.png)

## Tecnologías Utilizadas

### Frontend
- Angular 19
- Tailwind CSS 4
- TypeScript
- RxJS

### Backend
- NestJS
- TypeORM
- JWT para autenticación
- PostgreSQL como base de datos

### Despliegue
- Render para hosting del frontend, backend y base de datos PostgreSQL

## Funcionalidades Principales

### Para Clientes
- Explorar catálogo de productos de café
- Buscar productos por nombre o categoría
- Realizar pedidos directamente
- Ver confirmación de compra

### Para Administradores
- Panel de administración completo
- Gestión de productos (crear, editar, eliminar)
- Visualización y gestión de órdenes
- Actualización del estado de las órdenes

## Estructura del Proyecto

```
ProyectoFront/
├── Frontend/             # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/     # Servicios principales, guards, interceptors
│   │   │   ├── features/ # Componentes específicos por funcionalidad
│   │   │   ├── shared/   # Componentes, modelos y utilidades compartidas
│   │   ├── assets/       # Imágenes y recursos estáticos
│   │   └── environments/ # Configuraciones por entorno
│   └── ...
└── backend/              # API NestJS
    ├── src/
    │   ├── controllers/  # Controladores de la API
    │   ├── entities/     # Entidades y modelos de datos
    │   ├── services/     # Servicios de negocio
    │   └── ...
    └── ...
```

## Instalación y Configuración Local

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn
- PostgreSQL (local o remoto)

### Pasos para Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ProyectoFront
   ```

2. **Configurar el Backend**
   ```bash
   cd backend
   npm install
   # Configurar archivo .env con credenciales de base de datos
   npm run start:dev
   ```

3. **Configurar el Frontend**
   ```bash
   cd ../Frontend
   npm install
   ng serve
   ```

4. **Acceder a la aplicación**
   - Frontend: http://localhost:4000
   - API Backend: http://localhost:3001

## Despliegue en Producción

El proyecto está desplegado en Render con la siguiente configuración:

- **Frontend**: Aplicación Angular compilada y servida como sitio estático
- **Backend**: Webservice (NestJS)
- **Base de Datos**: PostgreSQL

### URLs de Producción
- Frontend:
- Backend API: 

## Documentación Detallada

Para documentación más detallada, consulte:

- [Documentación del Frontend](./Frontend/docs/index.html) 
- [Documentación de la API](./backend/docs/api.html) 




### Documentación de la API con Swagger
La documentación de la API está disponible en:
- Desarrollo local: http://localhost:3001/api
- Producción: https://cafetea-peru-api.onrender.com/api

## Licencia

Este proyecto está licenciado bajo [Licencia MIT](LICENSE)

## Contacto

Para más información, contactar a:
- Nombre: Jair Rivas
- Email: d.jair.rivas.n@gmail.com
