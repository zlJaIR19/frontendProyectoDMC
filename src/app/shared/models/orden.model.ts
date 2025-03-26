import { Usuario } from './usuario.model';
import { DetalleOrden } from './detalle-orden.model';

export interface Orden {
  id: number;
  fecha: Date;
  total: number;
  id_usuario: number;
  usuario?: Usuario;
  detalles?: DetalleOrden[];
}
