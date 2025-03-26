import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3001/usuarios';
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

  login(username: string, password: string, role: string): Observable<Usuario> {
    console.log(`Attempting to login with username: ${username}, role: ${role}`);
    console.log('API URL being used:', this.apiUrl);
    
    // Connect to the backend API to get real users
    return this.http.get<Usuario[]>(this.apiUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      map(users => {
        console.log('API response received, total users:', users?.length);
        
        // Find the user with matching username
        const user = users?.find(u => u.usuario === username);
        
        if (!user) {
          console.error('No user found with this username');
          throw new Error('Usuario no encontrado');
        }
        
        console.log('User found:', user);
        
        // Check if password matches
        if (user.contraseña !== password) {
          console.error('Password mismatch');
          throw new Error('Contraseña incorrecta');
        }
        
        // Check role match - using exact match with case insensitivity
        const userRole = user.rol.toLowerCase();
        const requestedRole = role.toLowerCase();
        
        console.log(`Checking roles: User role=${userRole}, Requested role=${requestedRole}`);
        
        // For admin login
        if (requestedRole === 'admin' || requestedRole === 'administrador') {
          if (userRole !== 'admin' && userRole !== 'administrador') {
            console.error('User is not an admin');
            throw new Error('No tienes permisos de administrador');
          }
        } 
        // For client login
        else if (requestedRole === 'cliente' || requestedRole === 'client') {
          if (userRole !== 'cliente') {
            console.error('User is not a client');
            throw new Error('No tienes permisos de cliente');
          }
        }
        
        // If we got here, authentication is successful
        console.log('Authentication successful');
        localStorage.setItem(this.tokenKey, 'demo-token');
        localStorage.setItem(this.userKey, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Error de conexión con el servidor. Asegúrate que el backend esté funcionando en http://localhost:3001'));
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
}
