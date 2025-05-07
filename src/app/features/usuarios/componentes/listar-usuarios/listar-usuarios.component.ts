import { Component, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css',
})
export class ListarUsuariosComponent {
  title: string = 'Listar usuarios';
  usuarios: any[] = [];
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = [
    'id',
    'nombre',
    'email',
    'telefono',
    'role',
    'nacimiento',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuariosService: UsuariosService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.usuariosService.listarUsuario().subscribe((data) => {
      this.title = 'Listado de Usuarios';
      this.usuarios = data;
      this.dataSource.data = this.usuarios;
    });
    console.log(this.dataSource.data, 'usuarios');
  }

  ngOnChanges() {
    if (this.usuarios && Array.isArray(this.usuarios)) {
      this.dataSource.data = [...this.usuarios];
    }
  }

  ngAfterViewInit() {
    console.log(this.dataSource.data, 'usuarios');
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUsuario(id: number) {
    this.usuariosService.eliminarPorId(id).subscribe(() => {
      this.usuariosService.listarUsuario().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
