import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input('title') title: string = 'Sín Título';
  @Input('data') datos: number[] = [350, 450, 100];
  @Input('labels') doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input('colors') backgroundColor: string[] = ['#FF735D', '#81EB42', '#5EA3EB']

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: this.datos,
        backgroundColor: this.backgroundColor
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnChanges(){
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ 
        data: this.datos,
        backgroundColor: this.backgroundColor
      }],
    };
  }
}
