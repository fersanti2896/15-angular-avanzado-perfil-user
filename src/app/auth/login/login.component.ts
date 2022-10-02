import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group( {
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ]
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  login() {
    /* Se inicia sesion */
    this.usuarioService.login( this.loginForm.value )
                        .subscribe( resp => {
                          if( this.loginForm.get('remember')?.value ) {
                            localStorage.setItem('email', this.loginForm.get('email')?.value! );
                          } else {
                            localStorage.removeItem('email');
                          }

                          /* Hace la navegación al dashboard */
                          this.router.navigateByUrl('/');
                        }, (err) => {
                          /* Si sucede un error */
                          Swal.fire('Error', err.error.msg, 'error');
                        });
  }

  campoNoValido( campo: string ): boolean {
    if( this.loginForm.get( campo )?.invalid && this.formSubmitted ) { 
      return true;
    } else {
      return false;
    }
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: '329466637365-hrtaah75vcarj3g852cfg7g64g15nt21.apps.googleusercontent.com',
      callback: ( response: any) => this.handleCredentialResponse( response ),
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }
    );
  }

  handleCredentialResponse( response: any ) {
    this.usuarioService.loginGogle( response.credential )
                       .subscribe( resp => {
                        /* Hace la navegación al dashboard */
                        this.router.navigateByUrl('/');
                       } );
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }
}
