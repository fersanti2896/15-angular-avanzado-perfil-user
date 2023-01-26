import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  /**
   * 
   * @param {File} archivo Ejemplo: Imagen de JPG o PNG
   * @param {string} tipo 
   * @param {string} id  
   * @returns 
   */
  async actualizarFoto( archivo: File, tipo: 'usuarios'|'medicos'|'hospitales', id: string ) {
    try {
      const url = `${ base_url }/uploads/${ tipo }/${ id }`;
      const fromData = new FormData();

      fromData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: fromData
      });

      const data = await resp.json();

      return ( data.ok ) ? data.nombreArchivo : console.log(data.msg);
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}
