import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orden } from '../../shared/models/orden.model';


const environment = {
  apiUrl: 'https://backendproyectodmc.onrender.com',
  production: true
};

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private apiUrl = `${environment.apiUrl}/ordenes`;

  constructor(private http: HttpClient) {}

  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.apiUrl);
  }

  getOrdenById(id: number): Observable<Orden> {
    return this.http.get<Orden>(`${this.apiUrl}/${id}`);
  }

  createOrden(orden: Partial<Orden>): Observable<Orden> {
    return this.http.post<Orden>(this.apiUrl, orden);
  }
}
