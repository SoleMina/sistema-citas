import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private urlBase = 'http://localhost:8080/api/citas';

  constructor(private http: HttpClient) {}

  listarCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.urlBase, {
      withCredentials: true,
    });
  }

  eliminarPorId(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${id}`, {
      withCredentials: true,
    });
  }

  registrarCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.urlBase, cita, {
      withCredentials: true,
    });
  }

  public actualizarCita(id: number, cita: Cita): Observable<any> {
    return this.http.put(this.urlBase + `/${id}`, cita, {
      withCredentials: true,
    });
  }
}
