import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../../../shared/models/orden.model';
import { AuthService } from '../../../core/auth/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-orden-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orden-detail.component.html',
  styleUrls: ['./orden-detail.component.css']
})
export class OrdenDetailComponent implements OnInit {
  orden: any = null;
  detallesOrden: any[] = [];
  isLoading = true;
  errorMessage = '';
  successMessage = '';
  ordenId = 0;

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
        this.ordenId = +id;
        this.loadOrden();
      } else {
        this.errorMessage = 'ID de orden no proporcionado';
        this.isLoading = false;
      }
    });
  }

  loadOrden(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.http.get(`${environment.apiUrl}/ordenes/${this.ordenId}?_expand=usuario`).subscribe({
      next: (data: any) => {
        this.orden = data;
        this.loadDetallesOrden();
      },
      error: (error) => {
        console.error('Error loading orden:', error);
        this.errorMessage = 'Error al cargar la orden. Por favor, intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  loadDetallesOrden(): void {
    this.http.get(`${environment.apiUrl}/detallesOrden?ordenId=${this.ordenId}&_expand=producto`).subscribe({
      next: (detalles: any) => {
        this.detallesOrden = detalles;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading detalles orden:', error);
        this.errorMessage = 'Error al cargar los detalles de la orden. Por favor, intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }

  updateEstado(estado: string): void {
    this.http.patch(`${environment.apiUrl}/ordenes/${this.ordenId}`, { estado }).subscribe({
      next: () => {
        this.successMessage = 'Estado actualizado correctamente.';
        setTimeout(() => this.successMessage = '', 3000);
        this.reloadOrdenDetails();
      },
      error: (error) => {
        console.error('Error updating estado:', error);
        this.errorMessage = 'Error al actualizar el estado. Por favor, intenta de nuevo.';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  reloadOrdenDetails(): void {
    this.loadOrden();
  }
}
