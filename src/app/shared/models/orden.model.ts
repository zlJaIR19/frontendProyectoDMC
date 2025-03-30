import { Usuario } from './usuario.model';
import { DetalleOrden } from './detalle-orden.model';

export interface Orden {
  id: number;
  fecha_pedido: Date;
  total: number;
  usuarioId: number;
  estado: string;
  usuario?: Usuario;
  detallesOrden?: DetalleOrden[];
}
