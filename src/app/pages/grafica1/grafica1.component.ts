import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  public labels1: string[]  = [ 'CETES', 'SuperTasas', 'Kubo Financiero', 'Finsus', 'GBM+' ];
  public data1: number[]    = [ 2634.71, 6727.87, 3689.26, 3199.43, 2486.67 ]; 
  public colors1: string[]  = [ '#6BA4FA', '#FF4838', '#41EB7A', '#FAE5D4', '#FFE038' ]

  public labels2: string[]  = [ 'Efectivo', 'Mercado Pago', 'Upsi Vale', 'Banco Azteca' ];
  public data2: number[]    = [ 300, 723.32, 24.99, 1 ]; 
  public colors2: string[]  = [ '#6BA4FA', '#FF4838', '#41EB7A', '#FF9C26', '#5AFADF' ]
}
