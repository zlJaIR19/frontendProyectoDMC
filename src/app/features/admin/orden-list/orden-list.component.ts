import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Orden } from '../../../shared/models/orden.model';
import { AuthService } from '../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-orden-list',
  templateUrl: './orden-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OrdenListComponent implements OnInit {
  ordenes: Orden[] = [];
  filteredOrdenes: Orden[] = [];
  isLoading = true;
  errorMessage = '';
  sortField = 'fecha_pedido';
  sortDirection: 'asc' | 'desc' = 'desc';
  searchTerm = '';
  currentUserName: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrdenes();
    this.getCurrentUserName();
  }

  loadOrdenes(): void {
    this.isLoading = true;
    this.http.get<Orden[]>(`${environment.apiUrl}/ordenes`).subscribe({
      next: (ordenes) => {
        this.ordenes = ordenes;
        this.filteredOrdenes = [...ordenes];
        this.sortOrdenes();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar las órdenes. Por favor intente más tarde.';
        this.isLoading = false;
        console.error('Error loading orders', error);
      }
    });
  }

  sortOrdenes(): void {
    this.filteredOrdenes.sort((a, b) => {
      const aValue = a[this.sortField as keyof Orden];
      const bValue = b[this.sortField as keyof Orden];
      
      if (this.sortField === 'fecha_pedido') {
        const aTime = new Date(aValue as string).getTime();
        const bTime = new Date(bValue as string).getTime();
        return this.sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aString = String(aValue);
      const bString = String(bValue);
      return this.sortDirection === 'asc' 
        ? aString.localeCompare(bString)
        : bString.localeCompare(aString);
    });
  }

  changeSortField(field: string): void {
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortOrdenes();
  }

  getSortIcon(field: string): string {
    if (field !== this.sortField) return 'fa-sort';
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  viewOrderDetails(ordenId: number): void {
    this.router.navigate(['/admin/ordenes', ordenId]);
  }

  searchOrders(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredOrdenes = this.ordenes.filter(orden => 
      orden.id.toString().includes(searchTerm) ||
      (orden.usuario?.nombre || '').toLowerCase().includes(searchTerm) ||
      orden.estado.toLowerCase().includes(searchTerm)
    );
  }

  getCurrentUserName(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.nombre) {
      this.currentUserName = currentUser.nombre;
    }
  }
}
