import { Categoria } from './categoria.model';
import { DetalleOrden } from './detalle-orden.model';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string;
  fecha_creacion: Date;
  categoriaId: number;
  categoria?: Categoria;
  detallesOrden?: DetalleOrden[];
}
