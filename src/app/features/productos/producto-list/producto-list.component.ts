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
  currentUserName: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.getCurrentUserName();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.http.get<Producto[]>('http://localhost:3001/productos').subscribe({
      next: (productos) => {
        this.productos = productos;
        this.filteredProductos = productos;
        this.isLoading = false;
        console.log('Loaded products:', productos);
        console.log('First product image path:', productos[0]?.imagen_url);
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

    // Convert price to number if it's a string
    const precioNumerico = typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio;

    // Create a new order directly
    const orden = {
      fecha: new Date(),
      total: precioNumerico,
      usuarioId: user.id, 
      detalles: [
        {
          cantidad: 1,
          precio_unitario: precioNumerico,
          subtotal: precioNumerico,
          productoId: producto.id 
        }
      ]
    };

    console.log('Sending order:', orden);

    // Send the order to the backend
    this.http.post('http://localhost:3001/ordenes', orden).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        this.successMessage = `Successfully ordered ${producto.nombre}`;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error placing order. Please try again later.';
        console.error('Error placing order', error);
      }
    });
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
