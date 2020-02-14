import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ResultService } from '../result.service';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Chart } from 'chart.js/dist/Chart.bundle';
import 'chartjs-plugin-datalabels';
import 'moment';
import 'chartjs-plugin-zoom';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit, AfterViewInit {

  details: UserDetails;

  user = {
    username: ''
  };

  canvas: any;
  ctx: any;
  chart = [];
  chartData1 = [];
  chartData2 = [];
  chartData3 = [];
  chartData4 = [];
  gradientFill1;
  gradientFill2;
  gradientFill3;
  gradientFill4;

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor(public auth: AuthenticationService, private Result: ResultService) {

  }

  ngOnInit() {

    this.auth.profile().subscribe(user => {
      this.details = user;
      this.user.username = user.username;
      this.Result.getOwnResults(this.user).subscribe(result => {
        let results = JSON.parse(result);
        results.sort(function (a, b) {
          var keyA = new Date(a.date);
          var keyB = new Date(b.date);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
        let count = results.length;
        for (var i = 0; i < count; i++) {
          if (results[i].level === 1) {
            let result = {
              x: new Date(results[i].date),
              y: results[i].points
            }
            this.chartData1.push(result);
          } else if (results[i].level === 2) {
            let result = {
              x: new Date(results[i].date),
              y: results[i].points
            }
            this.chartData2.push(result);
          } else if (results[i].level === 3) {
            let result = {
              x: new Date(results[i].date),
              y: results[i].points
            }
            this.chartData3.push(result);
          } else {
            let result = {
              x: new Date(results[i].date),
              y: results[i].points
            }
            this.chartData4.push(result);
          }

        }

      }, (err) => {
        console.error(err);
      });
    }, (err) => {
      console.error(err);
    });


  }

  ngAfterViewInit() {

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.gradientFill1 = this.ctx.createLinearGradient(0, 0, 0, 300);
    this.gradientFill1.addColorStop(0, 'rgba(128, 182, 244, 0.8)');
    this.gradientFill1.addColorStop(.3, 'rgba(128, 182, 244, 0.6)');
    this.gradientFill1.addColorStop(1, 'rgba(0, 212, 255, 0)');

    this.gradientFill2 = this.ctx.createLinearGradient(0, 0, 0, 300);
    this.gradientFill2.addColorStop(0, 'rgba(134, 7, 7, 0.8)');
    this.gradientFill2.addColorStop(.3, 'rgba(163, 5, 31, 0.6)');
    this.gradientFill2.addColorStop(1, 'rgba(255, 0, 108, 0)');

    this.gradientFill3 = this.ctx.createLinearGradient(0, 0, 0, 300);
    this.gradientFill3.addColorStop(0, 'rgba(6, 48, 2, 0.8)');
    this.gradientFill3.addColorStop(.3, 'rgba(7, 103, 21, 0.6)');
    this.gradientFill3.addColorStop(1, 'rgba(0, 255, 124, 0)');

    this.gradientFill4 = this.ctx.createLinearGradient(0, 0, 0, 300);
    this.gradientFill4.addColorStop(0, 'rgba(208, 200, 24, 0.8)');
    this.gradientFill4.addColorStop(.3, 'rgba(192, 195, 37, 0.6)');
    this.gradientFill4.addColorStop(1, 'rgba(255, 231, 0, 0)');

    setTimeout(() => {

      this.chart.push(new Chart(this.ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              data: this.chartData1,
              label: 'Level 1',
              backgroundColor: this.gradientFill1,
              borderColor: 'rgba(128, 182, 244, 0.8)',
              borderWidth: 2,
            },
            {
              data: this.chartData2,
              label: 'Level 2',
              backgroundColor: this.gradientFill2,
              borderColor: 'rgba(134, 7, 7, 0.8)',
              borderWidth: 2,
            },
            {
              data: this.chartData3,
              label: 'Level 3',
              backgroundColor: this.gradientFill3,
              borderColor: 'rgba(6, 48, 2, 0.8)',
              borderWidth: 2,
            },
            {
              data: this.chartData4,
              label: 'Level 4',
              backgroundColor: this.gradientFill4,
              borderColor: 'rgba(208, 200, 24, 0.8)',
              borderWidth: 2,
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Performance Chart',
            fontColor: 'whitesmoke'
          },
          legend: {
            labels: {
              fontColor: "whitesmoke"
            }
          },
          animation: {
            easing: 'easeInOutBack'
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                parser: 'timeFormat',
                tooltipFormat: 'YYYY.MM.DD HH:mm',
                displayFormats: {
                  'day': 'YYYY.MM.DD'
                }
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date',
                fontColor: 'whitesmoke'
              },
              ticks: {
                fontColor: 'whitesmoke'
              }
            }],
            yAxes: [{
              type: 'linear',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'points',
                fontColor: 'whitesmoke'
              },
              ticks: {
                fontColor: 'whitesmoke'
              }
            }]
          },
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'end',
              font: {
                size: 20,
              }
            },
            pan: {
              enabled: true,
              mode: "x",
              speed: 10,
              threshold: 10
            },
            zoom: {
              enabled: true,
              drag: false,
              mode: "xy",
              limits: {
                max: 10,
                min: 0.5
              }
            }
          },
        }
      }));

    }, 1000);

    /*
*/
  }

}
