import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrdenesService } from '../ordenes.service';

@Component({
  selector: 'app-orden-detail',
  templateUrl: './orden-detail.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class OrdenDetailComponent implements OnInit {
  ordenId: number | null = null;
  orden: any = null;
  detalles: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordenesService: OrdenesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ordenId = parseInt(id, 10);
        this.loadOrdenDetails();
      } else {
        this.errorMessage = 'ID de orden no encontrado';
        this.isLoading = false;
      }
    });
  }

  loadOrdenDetails(): void {
    this.isLoading = true;
    this.errorMessage = null;

    // Simulate API call - replace with actual service call
    setTimeout(() => {
      // Mock data - replace with actual API response
      this.orden = {
        id: this.ordenId,
        fecha: new Date(),
        id_usuario: 1,
        usuario: { nombre: 'Cliente Ejemplo', email: 'cliente@example.com' },
        total: 78.50,
        estado: 'Completada'
      };
      
      this.detalles = [
        { id: 1, id_producto: 1, producto: { nombre: 'Café Orgánico Premium', precio: 35.00 }, cantidad: 1, subtotal: 35.00 },
        { id: 2, id_producto: 2, producto: { nombre: 'Taza Cafetea Perú', precio: 25.00 }, cantidad: 1, subtotal: 25.00 },
        { id: 3, id_producto: 3, producto: { nombre: 'Filtros de Café', precio: 18.50 }, cantidad: 1, subtotal: 18.50 }
      ];
      
      this.isLoading = false;
    }, 1000);
  }

  goBack(): void {
    this.router.navigate(['/admin/ordenes']);
  }
}
