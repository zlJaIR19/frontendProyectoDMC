import { Producto } from './producto.model';

export interface DetalleOrden {
  id?: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  ordenId?: number;
  productoId?: number;
  producto?: Producto;
}
