import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  public lineChart!: any;
  @Input() labels!: string[];
  @Input() data!: string[];

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(){
  
    this.lineChart = new Chart("MyChart", {
      type: 'line', 

      data: {
        labels: this.labels, 
	       datasets: [
          {
            label: "Closing price",
            data: this.data,
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
        elements: {
          point: {
            radius: 2
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
            },
            display: false
          },
        }
      }
    });
  }

  updateChart(updatedData: number[], updatedLabels: Date[]) {
    let chartExist = Chart.getChart('MyChart');
    if (chartExist != undefined) {
      chartExist.data.datasets[0].data = updatedData;
      chartExist.data.labels = updatedLabels;
      chartExist.update(); 
    }
  }
}
