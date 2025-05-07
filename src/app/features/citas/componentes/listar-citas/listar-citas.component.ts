import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RegistrarCitasComponent } from '../registrar-citas/registrar-citas.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Cita } from '../../../../core/models/cita';
import { CitasService } from '../../../../core/services/citas.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-citas',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './listar-citas.component.html',
  styleUrl: './listar-citas.component.css',
})
export class ListarCitasComponent {
  title: string = 'Listar Citas';
  citas: Cita[] = [];

  displayedColumns: string[] = [
    'id',
    'medico',
    'paciente',
    'fecha',
    'hora',
    'estado',
    'actions',
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private citasService: CitasService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrarCitasComponent, {
      width: '500px',
      height: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
      }
    });
  }

  ngOnInit(): void {
    this.loadCitas();
  }

  ngOnChanges() {
    if (this.citas && Array.isArray(this.citas)) {
      this.dataSource.data = this.citas;
    }
  }

  ngAfterViewInit() {
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

  loadCitas(): void {
    this.citasService.listarCitas().subscribe({
      next: (data) => {
        this.citas = data;
        this.dataSource.data = [...this.citas];
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar citas:', err);
      },
    });
  }
  deleteCita(id: number) {
    this.citasService.eliminarPorId(id).subscribe({
      next: () => {
        this.loadCitas();
      },
    });
  }

  editCita(cita: Cita) {
    const dialogRef = this.dialog.open(RegistrarCitasComponent, {
      data: cita,
      disableClose: true,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCitas();
      }
    });
  }
}
