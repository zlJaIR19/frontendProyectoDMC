import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/models/usuario.model';

// Importación directa del objeto environment
const environment = {
  apiUrl: 'https://backendproyectodmc.onrender.com',
  production: true
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  // Usuarios de prueba para desarrollo
  private mockUsers: Usuario[] = [
    { 
      id: 1, 
      usuario: 'admin1', 
      contraseña: 'admin123', 
      rol: 'administrador', 
      nombre: 'Administrador',
      correo: 'admin@cafeteaperu.com',
      fecha_nacimiento: new Date('1990-01-01'),
      fecha_creacion: new Date()
    },
    { 
      id: 2, 
      usuario: 'cliente1', 
      contraseña: 'cliente123', 
      rol: 'cliente', 
      nombre: 'Cliente',
      correo: 'cliente@cafeteaperu.com',
      fecha_nacimiento: new Date('1995-01-01'),
      fecha_creacion: new Date()
    }
  ];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.userKey);
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string, role: string): Observable<boolean> {
    console.log(`Attempting to login with username: ${username}, role: ${role}`);
    
    // Usar datos de prueba en lugar de llamar al backend
    return of(this.mockUsers).pipe(
      map(users => {
        const user = users.find(u => u.usuario.toLowerCase() === username.toLowerCase());
        
        if (!user) {
          throw new Error('Usuario no encontrado');
        }
        
        if (user.contraseña !== password) {
          throw new Error('Contraseña incorrecta');
        }
        
        if (user.rol !== role) {
          throw new Error(`El usuario no tiene rol de ${role}`);
        }
        
        // Login successful
        localStorage.setItem(this.tokenKey, 'mock-jwt-token');
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    const userRole = user?.rol.toLowerCase();
    return !!user && (userRole === 'administrador' || userRole === 'admin');
  }

  isClient(): boolean {
    const user = this.currentUserSubject.value;
    return !!user && user.rol.toLowerCase() === 'cliente';
  }

  getCurrentUser(): Usuario | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  hasRole(role: string): boolean {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return false;
    return currentUser.rol.toLowerCase() === role.toLowerCase();
  }
}
