import { Producto } from './producto.model';
import { Orden } from './orden.model';

export interface DetalleOrden {
  id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  id_orden: number;
  id_producto: number;
  orden?: Orden;
  producto?: Producto;
}
