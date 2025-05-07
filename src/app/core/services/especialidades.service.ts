import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadesService {
  private urlBase = 'http://localhost:8080/api/especialidad';

  constructor(private http: HttpClient) {}

  listarEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.urlBase, {
      withCredentials: true,
    });
  }
  registrarEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.urlBase, especialidad, {
      withCredentials: true,
    });
  }
  buscarPorId(id: string): Observable<Especialidad> {
    return this.http.get<Especialidad>(this.urlBase + `/${id}`);
  }

  eliminarPorId(id: number): Observable<Especialidad> {
    return this.http.delete<any>(this.urlBase + `/${id}`, {
      withCredentials: true,
    });
  }
  actualizarEspecialidad(
    id: number,
    especialidad: Especialidad
  ): Observable<any> {
    return this.http.put(this.urlBase + `/${id}`, especialidad, {
      withCredentials: true,
    });
  }
}
