import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ '123', Validators.required ],
      email: [ 'abc', [ Validators.required, Validators.email ] ]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
                       .subscribe( resp => {
                        console.log(resp);
                       } ); 
  }
}
