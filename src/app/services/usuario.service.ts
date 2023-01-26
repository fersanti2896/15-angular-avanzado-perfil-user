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
    console.log(`UID: ${ this.usuario.uid} `);

    return this.usuario!.uid || '';
  }

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke( 'fersanti2896@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })
  }

  crearUsuario( formData: RegisterForm ) {
    return this.http.post( `${ base_url }/usuarios`, formData )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }

  actualizarUsuario( data: { email: string, nombre: string, role: string } ) {
    data = {
      ...data,
      role: this.usuario.role!
    };

    console.log(this.usuario)
    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });  
  }

  login( formData: any ) {
    const formLogin: LoginForm = formData;

    return this.http.post( `${ base_url }/login`, formLogin )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    );
  }

  loginGogle( token: string ) {
    return this.http.post( `${ base_url }/login/google`, { token } )
                    .pipe(
                      tap(( resp: any ) => {
                        localStorage.setItem('token', resp.token);
                      })
                    )
  }
}
