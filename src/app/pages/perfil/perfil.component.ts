import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario!: Usuario;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService ) {
    this.usuario = usuarioService.usuario;              
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ]
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
                       .subscribe( resp => {
                          const { nombre, email } = this.perfilForm.value;
                          this.usuario.nombre = nombre;
                          this.usuario.email = email;
                       } ); 
  }
}
