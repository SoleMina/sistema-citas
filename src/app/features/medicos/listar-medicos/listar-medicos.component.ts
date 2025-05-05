import { Component, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-listar-medicos',
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './listar-medicos.component.html',
  styleUrl: './listar-medicos.component.css',
})
export class ListarMedicosComponent {
  title: string = 'Listar médicos';
  medicos: any[] = [];
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
      this.medicos = data.filter((usuario) => usuario.rol_usua === 'MEDICO');
      this.dataSource.data = [...this.medicos];
    });
    console.log(this.dataSource.data, 'medicos usuarios');
  }

  ngOnChanges() {
    if (this.medicos && Array.isArray(this.medicos)) {
      this.dataSource.data = [...this.medicos];
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
}
