import { Categoria } from './categoria.model';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string | number;
  stock: number;
  imagen_url: string;
  fecha_creacion: string;
  categoriaId: number;
  categoria?: Categoria;
}
