# Guía de Mantenimiento de la Documentación

## Cafetea Perú

Esta guía explica cómo mantener actualizada la documentación del proyecto Cafetea Perú a medida que se realizan cambios y mejoras.

## Índice

1. [Documentación del Frontend](#documentación-del-frontend)
2. [Documentación de la API](#documentación-de-la-api)
3. [Documentación General](#documentación-general)
4. [Mejores Prácticas](#mejores-prácticas)

---

## Documentación del Frontend

### Actualización de la Documentación con Compodoc

Cada vez que se realicen cambios significativos en el frontend (nuevos componentes, servicios, etc.), se debe regenerar la documentación con Compodoc:

```bash
cd Frontend
npm run compodoc
```

Este comando generará una nueva versión de la documentación en la carpeta `Frontend/documentation`.

### Comentarios JSDoc/TSDoc

Para asegurar que Compodoc genere documentación de calidad, es importante mantener comentarios adecuados en el código:

1. **Componentes**:
   ```typescript
   /**
    * Componente que muestra la lista de productos disponibles para los clientes.
    * Permite buscar productos y realizar compras directas.
    */
   @Component({...})
   export class ProductoListComponent {
     /**
      * Lista de productos obtenidos de la API
      */
     productos: Producto[] = [];
     
     /**
      * Realiza la compra de un producto
      * @param producto El producto a comprar
      */
     comprarProducto(producto: Producto): void {
       // Implementación
     }
   }
   ```

2. **Servicios**:
   ```typescript
   /**
    * Servicio para gestionar la autenticación de usuarios
    */
   @Injectable({...})
   export class AuthService {
     /**
      * Inicia sesión con las credenciales proporcionadas
      * @param username Nombre de usuario
      * @param password Contraseña
      * @param rol Rol del usuario (admin o cliente)
      * @returns Observable con la respuesta del servidor
      */
     login(username: string, password: string, rol: string): Observable<any> {
       // Implementación
     }
   }
   ```

3. **Interfaces**:
   ```typescript
   /**
    * Representa un producto en el sistema
    */
   export interface Producto {
     /**
      * Identificador único del producto
      */
     id?: number;
     
     /**
      * Nombre del producto
      */
     nombre: string;
     
     // Otras propiedades...
   }
   ```

## Documentación de la API

### Actualización de la Documentación con Swagger

La documentación de la API se genera automáticamente con Swagger cada vez que se inicia el servidor backend. Para asegurar que la documentación sea completa y precisa:

1. **Decoradores en Controladores**:
   ```typescript
   import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
   
   @ApiTags('productos')
   @Controller('productos')
   export class ProductosController {
     @ApiOperation({ summary: 'Obtener todos los productos' })
     @ApiResponse({ status: 200, description: 'Lista de productos obtenida correctamente' })
     @ApiResponse({ status: 500, description: 'Error interno del servidor' })
     @Get()
     findAll() {
       // Implementación
     }
   }
   ```

2. **Decoradores en DTOs**:
   ```typescript
   import { ApiProperty } from '@nestjs/swagger';
   
   export class CreateProductoDto {
     @ApiProperty({
       description: 'Nombre del producto',
       example: 'Café Orgánico Premium'
     })
     nombre: string;
     
     @ApiProperty({
       description: 'Precio del producto',
       example: 25.99
     })
     precio: number;
     
     // Otras propiedades...
   }
   ```

3. **Para ver la documentación actualizada**:
   - Accede a http://localhost:3001/api cuando el servidor esté en ejecución
   - En producción: https://cafetea-peru-api.onrender.com/api

## Documentación General

### Actualización del README Principal

El archivo README.md principal debe actualizarse cuando:

1. Se añadan nuevas funcionalidades importantes
2. Cambien los requisitos del sistema
3. Se modifique el proceso de instalación o despliegue
4. Se actualicen las URLs de producción

### Actualización de Manuales de Usuario

Los manuales de usuario (`manual-cliente.md` y `manual-admin.md`) deben actualizarse cuando:

1. Se añadan nuevas funcionalidades visibles para los usuarios
2. Cambien los flujos de trabajo existentes
3. Se modifique la interfaz de usuario de manera significativa

### Actualización de la Documentación de la Base de Datos

El archivo `estructura-base-datos.md` debe actualizarse cuando:

1. Se añadan nuevas tablas
2. Se modifiquen las relaciones entre tablas existentes
3. Se añadan o eliminen campos en las tablas existentes
4. Cambien las restricciones o índices

## Mejores Prácticas

1. **Actualizar la documentación junto con el código**:
   - No dejes para después la actualización de la documentación
   - Incluye la actualización de la documentación en el mismo commit que los cambios de código

2. **Mantener coherencia**:
   - Usa la misma terminología en toda la documentación
   - Mantén el mismo estilo y formato

3. **Documentar decisiones importantes**:
   - Cuando tomes decisiones arquitectónicas importantes, documéntalas
   - Explica el "por qué" además del "cómo"

4. **Revisar periódicamente**:
   - Revisa la documentación cada cierto tiempo para asegurar que sigue siendo precisa
   - Elimina información obsoleta

5. **Documentar problemas conocidos**:
   - Si hay limitaciones o problemas conocidos, documéntalos
   - Incluye posibles soluciones o workarounds

---

© 2025 Cafetea Perú - Todos los derechos reservados
