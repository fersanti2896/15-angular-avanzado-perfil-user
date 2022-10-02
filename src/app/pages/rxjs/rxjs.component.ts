import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs?: Subscription; 

  constructor() { 
    /* this.retornaObservable().pipe(
      retry()  
    )
    .subscribe(
      valor => console.log('Subs:', valor),
      (err) => console.warn('Error:', err),
      () => console.info('Obs terminado')
    ); */

    this.intervalSubs = this.retornaInterval()
                            .subscribe(console.log)    
  }

  ngOnDestroy(): void {
    this.intervalSubs!.unsubscribe();
  }

  retornaInterval(): Observable<number> {
    return interval(100).pipe(
                            // take(10), /* Operador que solo emite lo que se le pasa por valor */
                            map( valor => valor + 1 ), /* Operador que transforma lo que recibe */
                            filter( valor => valor % 2 === 0 ) /* Operador que filtra los números en pares */
                          ); 
  }

  retornaObservable(): Observable<number> {
    /* Creando un observable */
    let i = -1;

    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval( () => {
        i++;  
        observer.next(i);

        if( i === 4 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        if( i === 2 ) {
          observer.error('i llegó al valor de 2');
        }
        
      }, 1000 );
    });

    return obs$;
  }
}