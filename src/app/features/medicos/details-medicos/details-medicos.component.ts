import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../../core/services/usuarios.service';

@Component({
  selector: 'app-details-medicos',
  imports: [],
  templateUrl: './details-medicos.component.html',
  styleUrl: './details-medicos.component.css',
})
export class DetailsMedicosComponent {
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params['id_usua'];

    console.log(userId, 'userId');

    if (userId) {
      this.usuariosService.buscarPorId(userId).subscribe((data) => {
        this.user = data;
      });
    }
  }
}
