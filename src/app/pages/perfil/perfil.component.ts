import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubida!: any;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {
    this.usuario = usuarioService.usuario;              
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ]
    });
  }

  /**
   * Funcion que actualiza la información del usuario
   */
  actualizarPerfil() {
    this.usuarioService.actualizarUsuario( this.perfilForm.value )
                       .subscribe( resp => {
                          const { nombre, email } = this.perfilForm.value;

                          this.usuario.nombre = nombre;
                          this.usuario.email = email;

                          Swal.fire('Guardado', 'Se guardó correctamente', 'success');
                       }, (err) => {
                          Swal.fire('Error', err.error.msg, 'error');
                       } ); 
  }

  /**
   * Función que recibe una imagen y lo asocia al parametro imagenSubida
   * @param {any} event Ejemplo: Archivo de imagen JPN o PNG, etc.  
   * @returns 
   */
  cambiarImagen( event: any ) {
    if( !event.target.files[0] ){
      this.imagenSubida = null;
      this.imgTemp = null;
    } else {
      const file = event.target.files[0];
      this.imagenSubida = file;
 
      const reader = new FileReader();
      reader.readAsDataURL(file);
 
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }

  /**
   * Función que actualiza la imagen en el servicio de FileUpload
   */
  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubida, 'usuarios', this.usuario.uid!)
                          .then( img => {
                            this.usuario.img = img
                            
                            Swal.fire('Guardado', 'Imagen del usuario guardado correctamente', 'success');
                          } )
                          .catch(err => {
                            Swal.fire('Error', 'No se pudo subir la imagen', 'error');
                          });
  }
}
