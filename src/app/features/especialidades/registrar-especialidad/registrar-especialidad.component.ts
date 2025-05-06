import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Especialidad } from '../../../core/models/especialidad';
import { EspecialidadesService } from '../../../core/services/especialidades.service';

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
    private router: Router,
    private especialidadService: EspecialidadesService
  ) {
    this.especialidadForm = this.fb.group({
      nom_espe: [null, [Validators.required]],
    });
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
    const formDataLogin = this.especialidadForm.value;
    console.log(formDataLogin, 'formDataLogin');
    if (this.especialidadForm.invalid) {
      this.especialidadForm.markAllAsTouched();
      return;
    } else {
      this.especialidadService
        .registrarEspecialidad(formDataLogin)
        .subscribe((data) => {
          this.router.navigate(['/especialidades']);
        });
      this.especialidadForm.reset();
    }
  }
}
