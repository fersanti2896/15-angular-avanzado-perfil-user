import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient,
               private router: Router ) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get( `${ base_url }/login/renew`, {   
      headers: {
        'x-token': token
      }
    })
    .pipe(
      tap(( resp: any ) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError( error => of(false))
    );
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
