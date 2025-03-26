import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Orden } from '../../../shared/models/orden.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-orden-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orden-list.component.html'
})
export class OrdenListComponent implements OnInit {
  ordenes: Orden[] = [];
  filteredOrdenes: Orden[] = [];
  isLoading = true;
  errorMessage = '';
  sortField = 'fecha';
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
    this.http.get<Orden[]>('http://localhost:3001/ordenes').subscribe({
      next: (ordenes) => {
        this.ordenes = ordenes;
        this.filteredOrdenes = ordenes;
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
      let aValue: any = a[this.sortField as keyof Orden];
      let bValue: any = b[this.sortField as keyof Orden];
      
      // Handle date comparison
      if (this.sortField === 'fecha') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (this.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  changeSortField(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortOrdenes();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'fa-sort';
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  viewOrderDetails(ordenId: number): void {
    this.router.navigate(['/admin/ordenes', ordenId]);
  }

  searchOrders(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    
    if (!this.searchTerm) {
      this.filteredOrdenes = [...this.ordenes];
    } else {
      this.filteredOrdenes = this.ordenes.filter(orden => 
        orden.id.toString().includes(this.searchTerm) || 
        (orden.usuario?.nombre && orden.usuario.nombre.toLowerCase().includes(this.searchTerm))
      );
    }
    
    this.sortOrdenes();
  }

  getCurrentUserName(): void {
    const currentUser = this.authService.getCurrentUser();
    console.log('Current user data:', currentUser);
    if (currentUser && currentUser.nombre) {
      this.currentUserName = currentUser.nombre;
      console.log('User full name (nombre):', this.currentUserName);
    } else {
      console.log('User name not available or not properly loaded');
    }
  }
}
