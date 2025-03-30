import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-orden-detail',
  template: `
    <div class="max-w-7xl mx-auto px-6 pt-16 pb-10">
      <!-- Header con información de la orden -->
      <div class="mb-10">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h2 class="text-3xl font-serif font-bold text-amber-900">Detalle de Orden #{{ ordenId }}</h2>
            <p class="text-amber-700 mt-2">{{ orden?.fecha_pedido | date:'dd/MM/yyyy HH:mm' }}</p>
          </div>
          <div class="flex gap-3">
            <button (click)="reloadOrdenDetails()" class="bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded hover:bg-amber-100 flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualizar
            </button>
            <button (click)="goBack()" class="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>
        </div>

        <!-- Estado de la orden -->
        <div class="mb-8">
          <span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium" 
                [ngClass]="{
                  'bg-green-100 text-green-800': orden?.estado === 'Completado',
                  'bg-yellow-100 text-yellow-800': orden?.estado === 'Pendiente',
                  'bg-blue-100 text-blue-800': orden?.estado === 'En proceso',
                  'bg-red-100 text-red-800': orden?.estado === 'Cancelado'
                }">
            <span class="mr-1.5 h-2.5 w-2.5 rounded-full" 
                  [ngClass]="{
                    'bg-green-500': orden?.estado === 'Completado',
                    'bg-yellow-500': orden?.estado === 'Pendiente',
                    'bg-blue-500': orden?.estado === 'En proceso',
                    'bg-red-500': orden?.estado === 'Cancelado'
                  }"></span>
            {{ orden?.estado || 'Pendiente' }}
          </span>
        </div>
      </div>

      <div *ngIf="isLoading" class="flex justify-center items-center py-20">
        <svg class="animate-spin h-12 w-12 text-amber-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>

      <div *ngIf="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-5 rounded mb-8">
        <div class="flex">
          <svg class="h-6 w-6 text-red-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{{ errorMessage }}</p>
        </div>
      </div>

      <div *ngIf="!isLoading && !errorMessage" class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <!-- Cliente info -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <h3 class="text-lg font-medium text-amber-900">Información del Cliente</h3>
          </div>
          <div class="p-6">
            <div *ngIf="orden?.usuario" class="space-y-5">
              <div class="flex items-center">
                <div class="bg-amber-100 rounded-full p-2.5 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Nombre</p>
                  <p class="font-medium text-gray-900">{{ orden.usuario.nombre }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="bg-amber-100 rounded-full p-2.5 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="font-medium text-gray-900">{{ orden.usuario.correo }}</p>
                </div>
              </div>
              <div class="flex items-center">
                <div class="bg-amber-100 rounded-full p-2.5 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-500">ID de Cliente</p>
                  <p class="font-medium text-gray-900">{{ orden.usuario.id }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Orden summary -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="bg-amber-50 px-6 py-4 border-b border-amber-100">
            <h3 class="text-lg font-medium text-amber-900">Resumen de la Orden</h3>
          </div>
          <div class="p-6">
            <div class="space-y-5">
              <div class="flex justify-between items-center pb-4 border-b border-gray-100">
                <span class="text-gray-600">Cantidad de productos:</span>
                <span class="font-medium text-gray-900">{{ detallesOrden.length }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">Subtotal:</span>
                <span class="font-medium text-gray-900">S/{{ orden?.total }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">Envío:</span>
                <span class="font-medium text-gray-900">S/0.00</span>
              </div>
              <div class="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                <span class="text-lg font-medium text-gray-900">Total:</span>
                <span class="text-lg font-bold text-amber-900">S/{{ orden?.total }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order items -->
      <div *ngIf="!isLoading && !errorMessage" class="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
        <div class="bg-amber-50 px-6 py-4 border-b border-amber-100">
          <h3 class="text-lg font-medium text-amber-900">Productos Ordenados</h3>
        </div>
        <div class="p-6">
          <div *ngIf="detallesOrden.length === 0" class="flex items-center justify-center py-12">
            <div class="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-14 w-14 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="mt-3 text-sm font-medium text-gray-900">No hay productos</h3>
              <p class="mt-2 text-sm text-gray-500">No se encontraron productos en esta orden.</p>
            </div>
          </div>
          
          <div *ngIf="detallesOrden.length > 0" class="overflow-x-auto -mx-6">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th scope="col" class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unitario</th>
                  <th scope="col" class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th scope="col" class="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let detalle of detallesOrden" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-5 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-12 w-12 bg-amber-100 rounded-md flex items-center justify-center">
                        <svg *ngIf="!detalle.producto?.imagen_url" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <img *ngIf="detalle.producto?.imagen_url" [src]="'/assets/' + detalle.producto.imagen_url" 
                             alt="Imagen del producto" 
                             class="h-12 w-12 object-cover rounded-md"
                             onerror="this.src='/assets/placeholder.jpg'; console.log('Image failed to load:', this.alt);">
                      </div>
                      <div class="ml-5">
                        <div class="text-sm font-medium text-gray-900">
                          {{ detalle.producto?.nombre || 'Producto no disponible' }}
                        </div>
                        <div *ngIf="!detalle.producto?.nombre" class="text-xs text-red-500">
                          ID: {{ detalle.productoId }}
                        </div>
                        <div *ngIf="detalle.producto?.descripcion" class="text-xs text-gray-500 max-w-xs truncate">
                          {{ detalle.producto.descripcion }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 whitespace-nowrap text-right text-sm text-gray-500">
                    S/{{ detalle.precio_unitario }}
                  </td>
                  <td class="px-6 py-5 whitespace-nowrap text-right text-sm text-gray-500">
                    {{ detalle.cantidad }}
                  </td>
                  <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                    S/{{ detalle.subtotal }}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="bg-gray-50">
                  <td colspan="3" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">Total:</td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-amber-900">
                    S/{{ orden?.total }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <div *ngIf="!isLoading && !errorMessage" class="flex justify-end space-x-4 mt-8">
        <button class="inline-flex items-center px-5 py-2.5 border border-amber-300 text-sm font-medium rounded-md text-amber-700 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Imprimir Orden
        </button>
        <button class="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Marcar como Completada
        </button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class OrdenDetailComponent implements OnInit {
  ordenId: number | null = null;
  orden: any = null;
  detallesOrden: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  currentUserName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ordenId = parseInt(id, 10);
        this.loadOrdenDetails();
      } else {
        this.errorMessage = 'ID de orden no válido';
        this.isLoading = false;
      }
    });
    this.getCurrentUserName();
  }

  loadOrdenDetails(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    console.log(`Cargando detalles de la orden ${this.ordenId}...`);
    
    // Solución basada en la memoria 47bf824f-6180-4df1-a390-d6e61596d0ec
    this.http.get<any>(`http://localhost:3001/ordenes/${this.ordenId}`).subscribe({
      next: (data) => {
        console.log('Datos recibidos de la API:', data);
        
        // Guardamos la orden completa
        this.orden = data;
        
        // Verificamos si hay detalles en la respuesta
        if (data.detallesOrden && Array.isArray(data.detallesOrden)) {
          console.log('Detalles encontrados:', data.detallesOrden);
          this.detallesOrden = data.detallesOrden;
        } 
        // Si no hay detallesOrden, buscamos en detalles (según memoria e4bbd91c-9ad1-42cb-b0d4-3ea21aeb8bd3)
        else if (data.detalles && Array.isArray(data.detalles)) {
          console.log('Detalles encontrados (nombre alternativo):', data.detalles);
          this.detallesOrden = data.detalles;
        }
        // Si no hay detalles en ningún campo
        else {
          console.warn('No se encontraron detalles en la respuesta');
          this.detallesOrden = [];
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar la orden:', error);
        this.errorMessage = 'Error al cargar la orden. Por favor, inténtelo de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }

  // Método para recargar los datos
  reloadOrdenDetails(): void {
    console.log('Recargando datos de la orden...');
    this.loadOrdenDetails();
  }

  goBack(): void {
    this.router.navigate(['/admin/ordenes']);
  }

  getCurrentUserName(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.nombre) {
      this.currentUserName = currentUser.nombre;
    }
  }
}
