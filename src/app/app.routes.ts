import { Routes } from '@angular/router';
import { ListarCitasComponent } from './features/citas/componentes/listar-citas/listar-citas.component';
import { ListarUsuariosComponent } from './features/usuarios/componentes/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ListarMedicosComponent } from './features/medicos/listar-medicos/listar-medicos.component';
import { ListarEspecialidadesComponent } from './features/especialidades/listar-especialidades/listar-especialidades.component';
import { DetailsComponent } from './features/usuarios/componentes/details/details.component';
import { DetailsMedicosComponent } from './features/medicos/details-medicos/details-medicos.component';
import { HomeComponent } from './features/home/home.component';
import { adminGuard } from './core/guards/admin.guard';
import { RegistrarUsuariosComponent } from './features/usuarios/componentes/registrar-usuarios/registrar-usuarios.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistrarUsuariosComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'usuarios/:id_usua',
    component: DetailsComponent,
    canActivate: [authGuard, adminGuard],
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
