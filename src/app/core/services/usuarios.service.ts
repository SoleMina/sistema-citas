import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private urlBase = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlBase, {
      withCredentials: true,
    });
  }

  buscarPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlBase + `/${id}`, {
      withCredentials: true,
    });
  }

  eliminarPorId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`, {
      withCredentials: true,
    });
  }
}
