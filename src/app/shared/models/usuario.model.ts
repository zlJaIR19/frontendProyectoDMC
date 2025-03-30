import { Orden } from './orden.model';

export interface Usuario {
  id: number;
  usuario: string;
  nombre: string;
  correo: string;
  contraseña: string;
  rol: string;
  fecha_nacimiento: Date;
  fecha_creacion: Date;
  ordenes?: Orden[];
}
