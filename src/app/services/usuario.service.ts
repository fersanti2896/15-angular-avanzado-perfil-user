import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any;
  public usuario!: Usuario;

  constructor( private http: HttpClient,
               private router: Router ) { }
  /**
   * Función que renueva el token cada vez que el usuario inicia sesión.
   * @returns Retorna verdadero y guarda el token en el localStorage
   */  
  validarToken(): Observable<boolean> {
    return this.http.get( `${ base_url }/login/renew`, {   
      headers: {
        'x-token': this.token
      }
    })
    .pipe(
      map(( resp: any ) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );

        localStorage.setItem('token', resp.token);

        return true;
      }),
      catchError( error => of(false))
    );
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario!.uid || '';
  }

  /**
   * Función que remueve el token del localStorage y cierra sesión.
   */
  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke( 'fersanti2896@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  /**
   * Función que crear el usuario desde el login y lo manda al backend. 
   * @param {RegisterForm} formData Data del usuario que se envía al backend 
   * @returns 
   */
  crearUsuario( formData: RegisterForm ) {
    return this.http.post( `${ base_url }/usuarios`, formData )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }

  /**
   * Función que actualiza la información del usuario.
   * @param {string, string, string} data Argumentos que se actualizan. 
   * @returns 
   */
  actualizarUsuario( data: { email: string, nombre: string, role: string } ) {
    data = {
      ...data,
      role: this.usuario.role!
    };

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });  
  }

  /**
   * Función que valida el inicio de sesión.
   * @param {any} formData Data que se envía al backend para iniciar sesión. 
   * @returns 
   */
  login( formData: any ) {
    const formLogin: LoginForm = formData;

    return this.http.post( `${ base_url }/login`, formLogin )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }

  /**
   * Función que inicia sesión por medio de Google.
   * @param {string} token Token del usuario. 
   * @returns 
   */
  loginGogle( token: string ) {
    return this.http.post( `${ base_url }/login/google`, { token } )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    )
  }
}
