import { Routes } from '@angular/router';
import { ListarCitasComponent } from './features/citas/componentes/listar-citas/listar-citas.component';
import { ListarUsuariosComponent } from './features/usuarios/componentes/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ListarCitasComponent,
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
