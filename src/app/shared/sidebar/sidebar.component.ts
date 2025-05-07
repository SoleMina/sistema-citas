import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    ToolbarComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  navItems: any[] = [
    {
      name: 'Home',
      link: '',
      icon: 'home',
    },
    {
      name: 'Users',
      link: 'usuarios',
      icon: 'manage_accounts',
    },
    {
      name: 'Médicos',
      link: 'medicos',
      icon: 'group',
    },
    {
      name: 'Citas',
      link: 'citas',
      icon: 'menu_book',
    },
    {
      name: 'Especialidades',
      link: 'especialidades',
      icon: 'account_box',
    },
    {
      name: 'Logout',
      link: 'login',
      icon: 'logout',
    },
  ];

  constructor(public router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
}
