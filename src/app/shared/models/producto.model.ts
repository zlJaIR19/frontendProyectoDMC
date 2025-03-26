import { Categoria } from './categoria.model';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  id_categoria: number;
  categoria?: Categoria;
}
