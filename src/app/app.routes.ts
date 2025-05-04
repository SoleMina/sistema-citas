import { Routes } from '@angular/router';
import { ListarCitasComponent } from './features/citas/componentes/listar-citas/listar-citas.component';
import { ListarUsuariosComponent } from './features/usuarios/componentes/listar-usuarios/listar-usuarios.component';

export const routes: Routes = [
  {
    path: 'citas',
    component: ListarCitasComponent,
  },
  {
    path: '',
    component: ListarUsuariosComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
