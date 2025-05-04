import { Component } from '@angular/core';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { materialImports } from './shared/material';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, materialImports, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: ` <app-sidebar></app-sidebar> `,
})
export class AppComponent {
  title = 'sistema-citas';
}
