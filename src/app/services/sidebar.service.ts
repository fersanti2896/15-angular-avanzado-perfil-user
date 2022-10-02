import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Gráficas', url: '/dashboard/grafica1' },
        { titulo: 'Main', url: '/' },
        { titulo: 'Progress Bar', url: '/dashboard/progress' },
        { titulo: 'Promesas', url: '/dashboard/promesas' },
        { titulo: 'Rxjs', url: '/dashboard/rxjs' }
      ]
    }
  ];

  constructor() { }
}
