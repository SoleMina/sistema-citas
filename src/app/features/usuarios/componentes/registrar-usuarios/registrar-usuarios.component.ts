import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../core/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-usuarios',
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registrar-usuarios.component.html',
  styleUrl: './registrar-usuarios.component.css',
})
export class RegistrarUsuariosComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom_usua: [null, [Validators.required]],
      correo: [null, [Validators.required]],
      pass_usua: [null, [Validators.required]],
      fono_usua: [null, [Validators.required]],
      fna_usua: [null, [Validators.required]],
      rol_usua: [null, [Validators.required]],
      id_espe: [null],
    });
  }

  get nombreControl() {
    return this.registerForm.get('nom_usua');
  }
  get nombreControlIsValid() {
    return this.nombreControl?.valid && this.nombreControl.touched;
  }
  get nombreControlIsInvalid() {
    return this.nombreControl?.invalid && this.nombreControl.touched;
  }

  get nombreErrors() {
    return this.nombreControl?.errors;
  }

  onSubmit() {
    const formData = this.registerForm.value;
    console.log(formData, 'formDataLogin');
    if (this.registerForm.invalid) {
      console.log(this.registerForm, 'is invalid');
      this.registerForm.markAllAsTouched();
      return;
    }

    this.usuarioService.registrarUsuario(formData).subscribe({
      next: (response) => {
        console.log(response, 'response');
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
    });
  }
}
