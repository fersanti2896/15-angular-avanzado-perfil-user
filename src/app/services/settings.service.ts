import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.cs';

    this.linkTheme!.setAttribute('href', url);
  }

  changeTheme( theme: string ) { 
    const url = `./assets/css/colors/${ theme }.css`

    this.linkTheme!.setAttribute('href', url);

    /* Guardamos los cambios que hace el usuario del color en el localStorage */
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    const checkTheme = document.querySelectorAll('.selector');

    checkTheme.forEach( element => {
      element.classList.remove('working');

      const btnTheme     = element.getAttribute('data-theme');
      const btnThemeUrl  = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme!.getAttribute('href');

      if( btnThemeUrl === currentTheme ) {
        element.classList.add('working');
      }
    });
  }
}
