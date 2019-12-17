import { Component, OnInit, HostListener } from '@angular/core';
import { SettingsService } from '../settings.service';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})


export class SetupComponent implements OnInit {

  public selectedTheme: 'dogs';
  public selectedSize: 4;

  public innerWidth: number;
  public innerHeight: number;

  themes: any[];
  themeclass: string;
  themeSelected = false;

  sizes: any[];
  sizeclass: string;
  sizeSelected = false;

  firstTens = [];

  @HostListener('window:resize', ['$event'])
  onresize(event) {
    this.innerWidth = event.target.innerWidth;
    this.innerHeight = event.target.innerHeight;
    this.setOptions();
  }


  constructor(private SettingsService: SettingsService, private ResultService: ResultService) {

  }

  setOptions() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.themes = [
      'dogs',
      'cats',
      'nature',
      'cartoons'
    ];

    if (this.innerWidth < 600 || this.innerHeight < 600) {
      this.sizes = [
        4,
        6
      ];
    } else if (this.innerWidth < 1024 || this.innerHeight < 900) {
      this.sizes = [
        4,
        6,
        8
      ];
    } else {
      this.sizes = [
        4,
        6,
        8,
        10
      ];
    }

    this.themeclass = '';
    this.sizeclass = '';
  }

  selectTheme(theme) {
    this.themeclass = theme;
    this.themeSelected = true;
    this.selectedTheme = theme;
  }

  selectSize(size) {
    this.sizeclass = size;
    this.sizeSelected = true;
    this.selectedSize = size;
  }

  startGame() {
    this.SettingsService.getSettings(this.selectedTheme, this.selectedSize);
  }

  ngOnInit() {
    this.setOptions();
    this.ResultService.getTopResults().subscribe(result => {
      let results = JSON.parse(result);
           for (var i=0; i < 10; i++) {
            this.firstTens.push(results[i]);
           }
      console.log(this.firstTens);
    }, (err) => {
      console.error(err);
    });
    
  }

}
