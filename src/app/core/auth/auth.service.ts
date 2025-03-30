import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/models/usuario.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private userKey = 'current_user';

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
    console.log('API URL being used:', this.apiUrl);
    
    return this.http.get<Usuario[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.usuario.toLowerCase() === username.toLowerCase());
        
        if (!user) {
          throw new Error('Usuario no encontrado');
        }
        
        if (user.contraseña !== password) {
          throw new Error('Contraseña incorrecta');
        }
        
        const userRole = user.rol.toLowerCase();
        const requestedRole = role.toLowerCase();
        
        console.log(`Checking roles: User role=${userRole}, Requested role=${requestedRole}`);
        
        if (requestedRole === 'admin' || requestedRole === 'administrador') {
          if (userRole !== 'admin' && userRole !== 'administrador') {
            throw new Error('No tienes permisos de administrador');
          }
        } 
        else if (requestedRole === 'cliente' || requestedRole === 'client') {
          if (userRole !== 'cliente') {
            throw new Error('No tienes permisos de cliente');
          }
        }
        
        localStorage.setItem(this.tokenKey, 'demo-token');
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return true;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(`Error de conexión con el servidor. Asegúrate que el backend esté funcionando en ${environment.apiUrl}`));
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
