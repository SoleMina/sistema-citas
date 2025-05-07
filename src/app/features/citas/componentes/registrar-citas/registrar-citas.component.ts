import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import Swal from 'sweetalert2';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
  MatNativeDateModule,
} from '@angular/material/core';

import { CitasService } from '../../../../core/services/citas.service';
import { Cita } from '../../../../core/models/cita';
import { CommonModule, formatDate } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { Especialidad } from '../../../../core/models/especialidad';
import { EspecialidadesService } from '../../../../core/services/especialidades.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-registrar-citas',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './registrar-citas.component.html',
  styleUrl: './registrar-citas.component.css',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class RegistrarCitasComponent {
  citasForm: FormGroup;
  currentUser: number | null = null;
  medicosList: any[] = [];
  especialidadList: Especialidad[] = [];

  horasDisponibles: string[] = [];
  estadoOptions: string[] = ['PENDIENTE', 'CONFIRMADA', 'CANCELADA'];

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private especialidadService: EspecialidadesService,
    private dialogRef: MatDialogRef<RegistrarCitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cita
  ) {
    this.currentUser = this.authService.currentUser?.id_usua || null;

    this.citasForm = this.fb.group({
      id_especialidad: [null, Validators.required],
      id_med: [null, [Validators.required]],
      fecha_cita: [null, [Validators.required]],
      hora_cita: [null, [Validators.required]],
      estado_cita: ['PENDIENTE', [Validators.required]],
    });
    if (data && data.id_cita) {
      const estadoNormalizado = data?.estado_cita?.toUpperCase() || 'PENDIENTE';
      this.citasForm.patchValue({
        id_med: data.id_med,
        fecha_cita: data.fecha_cita,
        hora_cita: data.hora_cita,
        id_usua: data.id_usua,
        estado_cita: estadoNormalizado,
      });

      this.citasForm.get('id_especialidad')?.disable();
      this.citasForm.get('id_med')?.disable();
    }

    this.especialidadService.listarEspecialidades().subscribe((data) => {
      this.especialidadList = data;
    });

    this.selectedEspecialidad();
  }

  ngOnInit() {
    this.generarHorasDisponibles();
  }

  get idmedControl() {
    return this.citasForm.get('id_med');
  }
  get idmedControlIsValid() {
    return this.idmedControl?.valid && this.idmedControl.touched;
  }
  get idmedControlIsInvalid() {
    return this.idmedControl?.invalid && this.idmedControl.touched;
  }

  get idmedErrors() {
    return this.idmedControl?.errors;
  }

  generarHorasDisponibles() {
    const horas: string[] = [];
    for (let h = 8; h <= 18; h++) {
      const horaStr = h < 10 ? `0${h}` : `${h}`;
      horas.push(`${horaStr}:00`);
      horas.push(`${horaStr}:30`);
    }
    this.horasDisponibles = horas;
  }

  onSubmit() {
    if (this.citasForm.invalid) {
      console.log(this.citasForm.value, 'form');
      this.citasForm.markAllAsTouched();
      return;
    }
    const rawFecha = this.citasForm.value.fecha_cita;
    const fechaFormateada = formatDate(rawFecha, 'yyyy-MM-dd', 'en-US');

    const rawHora = this.citasForm.value.hora_cita;
    const horaConSegundos = rawHora.length === 5 ? `${rawHora}:00` : rawHora;

    const rawForm = this.citasForm.getRawValue();

    const formData = {
      ...rawForm,
      fecha_cita: fechaFormateada,
      hora_cita: horaConSegundos,
      id_usua: this.currentUser,
    };

    console.log(formData);

    if (this.data?.id_cita) {
      this.citasService
        .actualizarCita(this.data.id_cita, formData)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cita actualizada',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close(true);
        });
    } else {
      this.citasService.registrarCita(formData).subscribe(() => {
        this.dialogRef.close(true);
        Swal.fire({
          icon: 'success',
          title: 'Cita registrada',
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  }

  selectedEspecialidad() {
    this.citasForm.get('id_especialidad')?.valueChanges.subscribe((id_espe) => {
      const especialidadSeleccionada = this.especialidadList.find(
        (esp) => esp.id_espe === id_espe
      );

      if (especialidadSeleccionada) {
        this.usuariosService.listarUsuario().subscribe((usuarios) => {
          this.medicosList = usuarios
            .filter(
              (usuario) =>
                usuario.rol_usua === 'MEDICO' &&
                usuario.id_espe === especialidadSeleccionada.id_espe
            )
            .map((medico) => ({
              ...medico,
              id_med: Number(medico?.id_usua),
            }));

          const idMedActual = this.citasForm.get('id_med')?.value;
          const existeMedico = this.medicosList.some(
            (med) => med.id_med === idMedActual
          );
          if (!existeMedico) {
            this.citasForm.get('id_med')?.setValue(null);
          }
        });
      } else {
        this.medicosList = [];
        this.citasForm.get('id_med')?.setValue(null);
      }
    });
  }
}
