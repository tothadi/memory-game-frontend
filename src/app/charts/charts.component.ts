import { Component, OnInit } from '@angular/core';
import { ResultService } from '../result.service';
import { AuthenticationService, UserDetails } from '../authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {

  details: UserDetails;

  user = {
    username: ''
  };

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    {
      data: [], label: 'Level 1'
    },
    { data: [], label: 'Level 2' },
    { data: [], label: 'Level 3' },
    { data: [], label: 'Level 4' }
  ];

  public chartLabels: Array<any> = [

  ];

  public chartColors: Array<any> = [

  ];

  public chartOptions: any = {
    responsive: true,
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
        distribution: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Date'
        },
        ticks: {
          source: 'auto',
          fontColor: 'whitesmoke'
        }
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'points'
        },
        ticks: {
          fontColor: 'whitesmoke'
        }
      }]
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
          rangeMin: {
            x: 3600
          },
          rangeMax: {
            x: null,
            y: null
          },
          onPan: function ({ chart }) { console.log(`I'm panning!!!`); },
          onPanComplete: function ({ chart }) { console.log(`I was panned!!!`); }
        },
        zoom: {
          enabled: true,
          drag: true,
          mode: 'x',
          speed: 0.05,
          rangeMin: {
            x: null,
            y: null
          },
          rangeMax: {
            x: null,
            y: null
          },
          onZoom: function ({ chart }) { console.log(`I'm zooming!!!`); },
          onZoomComplete: function ({ chart }) { console.log(`I was zoomed!!!`); }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
        }
      }
    }
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor(public auth: AuthenticationService, private Result: ResultService) {

  }

  ngOnInit() {
    setTimeout(() => {
    let canvas = $('#myCanvas').get(0).getContext('2d');

    var gradientFill1 = canvas.createLinearGradient(0, 0, 0, 300);
    gradientFill1.addColorStop(0, 'rgba(128, 182, 244, 0.8)');
    gradientFill1.addColorStop(.3, 'rgba(128, 182, 244, 0.6)');
    gradientFill1.addColorStop(1, 'rgba(0, 212, 255, 0)');

    var gradientFill2 = canvas.createLinearGradient(0, 0, 0, 300);
    gradientFill2.addColorStop(0, 'rgba(134, 7, 7, 0.8)');
    gradientFill2.addColorStop(.3, 'rgba(163, 5, 31, 0.6)');
    gradientFill2.addColorStop(1, 'rgba(255, 0, 108, 0)');

    var gradientFill3 = canvas.createLinearGradient(0, 0, 0, 300);
    gradientFill3.addColorStop(0, 'rgba(6, 48, 2, 0.8)');
    gradientFill3.addColorStop(.3, 'rgba(7, 103, 21, 0.6)');
    gradientFill3.addColorStop(1, 'rgba(0, 255, 124, 0)');

    var gradientFill4 = canvas.createLinearGradient(0, 0, 0, 300);
    gradientFill4.addColorStop(0, 'rgba(208, 200, 24, 0.8)');
    gradientFill4.addColorStop(.3, 'rgba(192, 195, 37, 0.6)');
    gradientFill4.addColorStop(1, 'rgba(255, 231, 0, 0)');
    this.chartColors = [
      {
        backgroundColor: gradientFill1,
        borderColor: 'rgba(128, 182, 244, 0.8)',
        borderWidth: 2,
      },
      {
        backgroundColor: gradientFill2,
        borderColor: 'rgba(134, 7, 7, 0.8)',
        borderWidth: 2,
      },
      {
        backgroundColor: gradientFill3,
        borderColor: 'rgba(6, 48, 2, 0.8)',
        borderWidth: 2,
      },
      {
        backgroundColor: gradientFill4,
        borderColor: 'rgba(208, 200, 24, 0.8)',
        borderWidth: 2,
      }
    ];
    }, 2000);
    


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
            this.chartDatasets[0].data.push(result);
            //var point = new PointConstructor(new Date(results[i].date), results[i].points);
            //this.chartDatasets[0].data.push(point);
            //console.log(point);
            // this.chartLabels[0].data.push(date.format(new Date(results[i].date), 'YYYY.MM.DD'));
          } else if (results[i].level === 2) {
            let result = {
              x: new Date(results[i].date),
              y: results[i].points
            }
            this.chartDatasets[1].data.push(result);
          } else if (results[i].level === 3) {
            let result = {
              x: new Date(results[i].date),
              y: results[i].points
            }
            this.chartDatasets[2].data.push(result);
          } else {
            let result = {
              x: new Date(results[i].date),
              y: results[i].points
            }
            this.chartDatasets[3].data.push(result);
          }

        }

      }, (err) => {
        console.error(err);
      });
    }, (err) => {
      console.error(err);
    });

  }

}
