import {
  ChangeDetectorRef,
  Component,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
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
import { EspecialidadesService } from '../../../core/services/especialidades.service';
import { Especialidad } from '../../../core/models/especialidad';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarEspecialidadComponent } from '../registrar-especialidad/registrar-especialidad.component';

@Component({
  selector: 'app-listar-especialidades',
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginator,
    MatSort,
    MatButtonModule,
  ],
  templateUrl: './listar-especialidades.component.html',
  styleUrl: './listar-especialidades.component.css',
})
export class ListarEspecialidadesComponent {
  title: string = 'Listar Especialidades';
  especialidades: Especialidad[] = [];
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns: string[] = ['id', 'nombre', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private especialidadService: EspecialidadesService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.especialidadService.listarEspecialidades().subscribe((data) => {
      this.especialidades = data;
      this.dataSource.data = this.especialidades;
    });
    console.log(this.dataSource.data, 'especialidades');
  }

  ngOnChanges() {
    if (this.especialidades && Array.isArray(this.especialidades)) {
      this.dataSource.data = [...this.especialidades];
    }
  }

  ngAfterViewInit() {
    console.log(this.dataSource.data, 'especialidades');
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

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrarEspecialidadComponent, {
      width: '500px',
      height: '420px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEspecialidades();
      }
    });
  }
  deleteEspecialidad(id: number) {
    this.especialidadService.eliminarPorId(id).subscribe({
      next: () => {
        this.loadEspecialidades();
      },
      error: (err) => {
        console.error('Error al eliminar especialidad:', err);
      },
    });
  }

  loadEspecialidades(): void {
    this.especialidadService.listarEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
        this.dataSource.data = [...this.especialidades];
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
      },
    });
  }

  editEspecialidad(especialidad: Especialidad) {
    const dialogRef = this.dialog.open(RegistrarEspecialidadComponent, {
      data: especialidad,
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEspecialidades();
      }
    });
  }
}
