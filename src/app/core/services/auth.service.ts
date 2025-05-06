import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginPayload } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUserSubject = new BehaviorSubject<Usuario | null>(null);
  public authUser$: Observable<Usuario | null> =
    this.authUserSubject.asObservable();

  private urlBase = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('auth_user');
      if (user) {
        this.authUserSubject.next(JSON.parse(user));
      }
    }
  }

  login(payload: LoginPayload): void {
    this.http.post<Usuario>(`${this.urlBase}/login`, payload).subscribe({
      next: (usuario) => {
        console.log(usuario, 'usaurio en servicio');
        const token = btoa(`${usuario.id_usua}:${usuario.correo}`);
        localStorage.setItem('access_token', token);
        localStorage.setItem('auth_user', JSON.stringify(usuario));
        this.authUserSubject.next(usuario);
        this.router.navigate(['/usuarios']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          alert('No se puede conectar con el servidor');
        } else {
          alert('Correo o contraseña inválidos');
        }
      },
    });
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth_user');
    this.authUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      const user = localStorage.getItem('auth_user');
      if (token && user) {
        this.authUserSubject.next(JSON.parse(user));
        return of(true);
      }
    }
    return of(false);
  }

  get currentUser(): Usuario | null {
    return this.authUserSubject.value;
  }
}
