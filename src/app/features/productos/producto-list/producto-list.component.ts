import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../../shared/models/producto.model';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './producto-list.component.html'
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  filteredProductos: Producto[] = [];
  searchTerm = '';
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.http.get<Producto[]>('http://localhost:3001/productos').subscribe({
      next: (productos) => {
        this.productos = productos;
        this.filteredProductos = productos;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading products. Please try again later.';
        this.isLoading = false;
        console.error('Error loading products', error);
      }
    });
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProductos = this.productos;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredProductos = this.productos.filter(producto => 
      producto.nombre.toLowerCase().includes(term) || 
      producto.descripcion.toLowerCase().includes(term)
    );
  }

  comprar(producto: Producto): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.errorMessage = 'You must be logged in to place an order';
      return;
    }

    // Create a new order directly
    const orden = {
      fecha: new Date(),
      total: producto.precio,
      id_usuario: user.id,
      detalles: [
        {
          cantidad: 1,
          precio_unitario: producto.precio,
          subtotal: producto.precio,
          id_producto: producto.id
        }
      ]
    };

    // Send the order to the backend
    this.http.post('http://localhost:3001/ordenes', orden).subscribe({
      next: () => {
        this.successMessage = `Successfully ordered ${producto.nombre}`;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error placing order. Please try again later.';
        console.error('Error placing order', error);
      }
    });
  }
}
