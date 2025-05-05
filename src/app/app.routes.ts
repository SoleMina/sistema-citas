import { Routes } from '@angular/router';
import { ListarCitasComponent } from './features/citas/componentes/listar-citas/listar-citas.component';
import { ListarUsuariosComponent } from './features/usuarios/componentes/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ListarMedicosComponent } from './features/medicos/listar-medicos/listar-medicos.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ListarCitasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'citas',
    component: ListarCitasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'medicos',
    component: ListarMedicosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
