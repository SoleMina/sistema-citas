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
import { CommonModule } from '@angular/common';
import { Especialidad } from '../../../core/models/especialidad';
import { EspecialidadesService } from '../../../core/services/especialidades.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-especialidad',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registrar-especialidad.component.html',
  styleUrl: './registrar-especialidad.component.css',
})
export class RegistrarEspecialidadComponent {
  especialidadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private especialidadService: EspecialidadesService,
    private dialogRef: MatDialogRef<RegistrarEspecialidadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Especialidad
  ) {
    this.especialidadForm = this.fb.group({
      nom_espe: [null, [Validators.required]],
    });
    if (data) {
      this.especialidadForm.patchValue({
        nom_espe: data.nom_espe,
      });
    }
  }

  get especialidadControl() {
    return this.especialidadForm.get('nom_espe');
  }
  get especialidadControlIsValid() {
    return this.especialidadControl?.valid && this.especialidadControl.touched;
  }
  get especialidadControlIsInvalid() {
    return (
      this.especialidadControl?.invalid && this.especialidadControl.touched
    );
  }

  get especialidadErrors() {
    return this.especialidadControl?.errors;
  }

  onSubmit() {
    const formData = this.especialidadForm.value;
    console.log(formData, 'formDataLogin');
    if (this.especialidadForm.invalid) {
      this.especialidadForm.markAllAsTouched();
      return;
    }

    if (this.data?.id_espe) {
      this.especialidadService
        .actualizarEspecialidad(this.data.id_espe, formData)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Especialidad actualizada',
            showConfirmButton: false,
            timer: 1500,
          });
          this.dialogRef.close(true);
        });
    } else {
      this.especialidadService.registrarEspecialidad(formData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Especialidad registrada',
          showConfirmButton: false,
          timer: 1500,
        });
        this.dialogRef.close(true);
      });
    }
  }
}
