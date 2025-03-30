import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../shared/models/producto.model';
import { Categoria } from '../../../shared/models/categoria.model';

// Importación directa del objeto environment
const environment = {
  apiUrl: 'https://backendproyectodmc.onrender.com',
  production: true
};

@Component({
  selector: 'app-producto-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './producto-management.component.html'
})
export class ProductoManagementComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  productoForm: FormGroup;
  isEditing = false;
  currentProductId: number | null = null;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  imagePreview: string | null = null;
  
  imagenesPredeterminadas = [
    { valor: 'products/coffee1.jpg', nombre: 'Café en Grano 1' },
    { valor: 'products/coffee2.jpg', nombre: 'Café en Grano 2' },
    { valor: 'products/coffee3.jpg', nombre: 'Café Molido 1' },
    { valor: 'products/coffee4.jpg', nombre: 'Café Molido 2' },
    { valor: 'products/french-press.jpg', nombre: 'Prensa Francesa' },
    { valor: 'products/chemex.jpg', nombre: 'Chemex' },
    { valor: 'products/v60.jpg', nombre: 'V60' },
    { valor: 'products/aeropress.jpg', nombre: 'AeroPress' }
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imagen_url: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProductos();
    this.loadCategorias();
  }

  loadProductos(): void {
    this.isLoading = true;
    this.http.get<Producto[]>(`${environment.apiUrl}/productos`).subscribe({
      next: (productos) => {
        this.productos = productos;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos. Por favor, inténtelo de nuevo más tarde.';
        this.isLoading = false;
        console.error('Error al cargar los productos', error);
      }
    });
  }

  loadCategorias(): void {
    this.http.get<Categoria[]>(`${environment.apiUrl}/categorias`).subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (error) => {
        console.error('Error al cargar las categorías', error);
      }
    });
  }

  onImageUrlChange(): void {
    const imageUrl = this.productoForm.get('imagen_url')?.value;
    if (imageUrl) {
      this.imagePreview = `assets/${imageUrl}`;
    } else {
      this.imagePreview = null;
    }
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos requeridos correctamente.';
      return;
    }

    const productoData = this.productoForm.value;
    
    if (this.isEditing && this.currentProductId) {
      this.http.patch(`${environment.apiUrl}/productos/${this.currentProductId}`, productoData).subscribe({
        next: () => {
          this.successMessage = '¡Producto actualizado con éxito!';
          this.resetForm();
          this.loadProductos();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el producto. Por favor, inténtelo de nuevo.';
          console.error('Error al actualizar el producto', error);
        }
      });
    } else {
      this.http.post(`${environment.apiUrl}/productos`, productoData).subscribe({
        next: () => {
          this.successMessage = '¡Producto creado con éxito!';
          this.resetForm();
          this.loadProductos();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el producto. Por favor, inténtelo de nuevo.';
          console.error('Error al crear el producto', error);
        }
      });
    }
  }

  editProducto(producto: Producto): void {
    this.isEditing = true;
    this.currentProductId = producto.id;
    this.productoForm.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen_url: producto.imagen_url,
      categoriaId: producto.categoriaId
    });
    
    if (producto.imagen_url) {
      this.imagePreview = `assets/${producto.imagen_url}`;
    }
  }

  deleteProducto(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.http.delete(`${environment.apiUrl}/productos/${id}`).subscribe({
        next: () => {
          this.successMessage = '¡Producto eliminado con éxito!';
          this.loadProductos();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar el producto. Por favor, inténtelo de nuevo.';
          console.error('Error al eliminar el producto', error);
        }
      });
    }
  }

  resetForm(): void {
    this.productoForm.reset();
    this.isEditing = false;
    this.currentProductId = null;
    this.imagePreview = null;
    this.errorMessage = '';
  }

  onImageSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement && selectElement.value) {
      this.productoForm.get('imagen_url')?.setValue(selectElement.value);
      this.onImageUrlChange();
    }
  }
}
