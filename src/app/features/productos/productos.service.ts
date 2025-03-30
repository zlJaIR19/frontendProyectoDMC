import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../shared/models/producto.model';

// Importación directa del objeto environment
const environment = {
  apiUrl: 'https://backendproyectodmc.onrender.com',
  production: true
};

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  searchProductos(term: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?nombre_like=${term}`);
  }
}
