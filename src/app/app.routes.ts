import { Routes } from '@angular/router';
import { ListarCitasComponent } from './features/citas/componentes/listar-citas/listar-citas.component';
import { ListarUsuariosComponent } from './features/usuarios/componentes/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ListarMedicosComponent } from './features/medicos/listar-medicos/listar-medicos.component';
import { ListarEspecialidadesComponent } from './features/especialidades/listar-especialidades/listar-especialidades.component';
import { DetailsComponent } from './features/usuarios/componentes/details/details.component';
import { DetailsMedicosComponent } from './features/medicos/details-medicos/details-medicos.component';

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
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios/:id_usua',
    component: DetailsComponent,
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
    path: 'medicos/:id_usua',
    component: DetailsMedicosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'especialidades',
    component: ListarEspecialidadesComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
