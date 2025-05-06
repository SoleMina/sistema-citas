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
  horasDisponibles: string[] = [];
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private dialogRef: MatDialogRef<RegistrarCitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cita
  ) {
    this.citasForm = this.fb.group({
      id_med: [null, [Validators.required]],
      id_usua: [null, [Validators.required]],
      fecha_cita: [null, [Validators.required]],
      hora_cita: [null, [Validators.required]],
      estado_cita: [null, [Validators.required]],
    });
    if (data) {
      this.citasForm.patchValue({
        id_med: data.id_med,
      });
    }
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
    const rawFecha = this.citasForm.value.fecha_cita;
    const fechaFormateada = formatDate(rawFecha, 'yyyy-MM-dd', 'en-US');

    const formData = {
      ...this.citasForm.value,
      fecha_cita: fechaFormateada,
    };

    console.log(formData);
  }
}
