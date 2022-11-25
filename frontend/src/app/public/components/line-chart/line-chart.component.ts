import { CdkTextColumn } from '@angular/cdk/table';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  public chart: any;
  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }


  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'line', 

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'rgb(39, 132, 64, 0.5)',
            borderColor: 'rgb(39, 132, 64)',
            fill: true
          }
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            grid: {
              display: false
            },
            display: false
          },
          x: {
            grid: {
              display: false
            }
          },
        }
      }
    });
  }
}
