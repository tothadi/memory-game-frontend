import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingsService } from '../settings.service';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { Subscription } from 'rxjs';
import * as uniqueRandom from 'unique-random-at-depth';
import * as $ from 'jquery';
import { SimpleTimer } from 'ng2-simple-timer';
import { Router } from "@angular/router";
import { ResultService, Result } from '../result.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, OnDestroy {

  details: UserDetails;


  subscriptionTheme: Subscription;
  subscriptionSize: Subscription;

  pictures = [];
  theme: string;
  size: number;
  columns: number;
  random = uniqueRandom(1, 30, 30);
  firstPicId: number;
  secondPicId: number;
  showFirst = false;
  firstClick = true;
  gameEnded = false;
  matchCount = 0;
  level: number;
  levelShow: Number;
  time;
  timeInMs: number;
  points: number;

  CounterMs = 0;
  milliseconds = 0;
  timerMsId: string;
  timerMsName: string = '1 ms'

  CounterSec = 0;
  seconds = '00';
  timerSecId: string;
  timerSecName: string = '1 sec'

  CounterMin = 0;
  minutes = '00';
  timerMinId: string;
  timerMinName: string = '1 minute'

  CounterHour = 0;
  hours = '00';
  timerHourId: string;
  timerHourName: string = '1 hour'

  constructor(private SettingsService: SettingsService, private auth: AuthenticationService, private timer: SimpleTimer, private router: Router, private Result: ResultService) {

  }

  secondPic() {
    var first = $('.first').attr('index');
    var second = $('.second').attr('index');
    if (first === second) {
      this.matchCount++;
      if (this.matchCount === this.size) {
        this.unSubscribeTimers();
        this.time = this.hours + ':' + this.minutes + ':' + this.seconds + '.' + this.milliseconds.toString();
        this.timeInMs = (parseInt(this.hours) * 3600000) + (parseInt(this.minutes) * 60000) + (parseInt(this.seconds) * 1000) + (this.milliseconds * 10);
        this.points = Math.round((1 / this.timeInMs) * 1000000000 * (Math.pow(this.level, 2) / 4));
        setTimeout(() => {
          this.delAllTimers();
          this.gameEnded = true;
          //send to backend
          let resultBlock: Result = { username: this.details.username, time: this.timeInMs, level: this.levelShow, date: new Date(), points: this.points };
          this.Result.addResult(resultBlock).subscribe(result => {
          });
        }, 2000);
        setTimeout(() => {
          this.router.navigate(['/setup']);
        }, 6000);
      }
      this.showFirst = false;
      $('.first').addClass('last-two');
      $('.second').addClass('last-two');
      setTimeout(() => {
        $('.first').removeClass('last-two');
        $('.second').removeClass('last-two');
        $('.first').removeClass('first');
        $('.second').removeClass('second');
      }, 500);
    } else {
      this.showFirst = false;
      setTimeout(() => {
        $('.first').removeClass('shown');
        $('.second').removeClass('shown');
        $('.first').removeClass('first');
        $('.second').removeClass('second');
      }, 500);
    }
  }

  showPic(event) {
    if (this.firstClick) {
      this.subscribeTimers();
      this.firstClick = false;
    }
    var target = event.target;
    var src = parseInt(target.src.substr(-6, 2));
    if (isNaN(src)) {
      src = parseInt(target.src.substr(-5, 1));
    }
    if (!this.showFirst) {
      this.firstPicId = src;
      this.showFirst = true;
      $(target).addClass('first shown');
      $(target).attr('index', src);
    } else {
      this.secondPicId = src;
      $(target).addClass('second shown');
      $(target).attr('index', src);
      $('#pictures').css('pointer-events', 'none');
      setTimeout(() => {
        $('#pictures').css('pointer-events', 'initial');
      }, 600);
      this.secondPic();
    }
  }

  subscribeTimers() {
    this.subscribeTimerMs();
    this.subscribeTimerSec();
    this.subscribeTimerMin();
    this.subscribeTimerHour();
  }

  unSubscribeTimers() {
    this.timer.unsubscribe(this.timerMsId);
    this.timer.unsubscribe(this.timerSecId);
    this.timer.unsubscribe(this.timerMinId);
    this.timer.unsubscribe(this.timerHourId);
  }

  delAllTimers() {
    this.timer.delTimer(this.timerMsName);
    this.timer.delTimer(this.timerSecName);
    this.timer.delTimer(this.timerMinName);
    this.timer.delTimer(this.timerHourName);
    this.milliseconds = 0;
    this.seconds = '00';
    this.minutes = '00';
    this.hours = '00';
  }

  subscribeTimerMs() {
    if (this.timerMsId) {
      // Unsubscribe if timer Id is defined
      this.timer.unsubscribe(this.timerMsId);
      this.timerMsId = undefined;
    } else {
      // Subscribe if timer Id is undefined
      this.timerMsId = this.timer.subscribe(this.timerMsName, () => this.timerMsCallback());
    }
  }

  subscribeTimerSec() {
    if (this.timerSecId) {
      // Unsubscribe if timer Id is defined
      this.timer.unsubscribe(this.timerSecId);
      this.timerSecId = undefined;
    } else {
      // Subscribe if timer Id is undefined
      this.timerSecId = this.timer.subscribe(this.timerSecName, () => this.timerSecCallback());
    }
  }

  subscribeTimerMin() {
    if (this.timerMinId) {
      // Unsubscribe if timer Id is defined
      this.timer.unsubscribe(this.timerMinId);
      this.timerMinId = undefined;
    } else {
      // Subscribe if timer Id is undefined
      this.timerMinId = this.timer.subscribe(this.timerMinName, () => this.timerMinCallback());
    }
  }

  subscribeTimerHour() {
    if (this.timerHourId) {
      // Unsubscribe if timer Id is defined
      this.timer.unsubscribe(this.timerHourId);
      this.timerHourId = undefined;
    } else {
      // Subscribe if timer Id is undefined
      this.timerHourId = this.timer.subscribe(this.timerHourName, () => this.timerHourCallback());
    }
  }

  timerMsCallback(): void {
    this.CounterMs++;
    if (this.CounterMs === 100) {
      this.CounterMs = 0;
    }
    this.milliseconds = this.CounterMs;
  }

  timerSecCallback(): void {
    this.CounterSec++;
    if (this.CounterSec === 60) {
      this.CounterSec = 0;
    }
    if (this.CounterSec < 10) {
      this.seconds = '0' + this.CounterSec;
    } else {
      this.seconds = this.CounterSec.toString();
    }
  }

  timerMinCallback(): void {
    this.CounterMin++;
    if (this.CounterMin === 60) {
      this.CounterMin = 0;
    }
    if (this.CounterMin < 10) {
      this.minutes = '0' + this.CounterMin;
    } else {
      this.minutes = this.CounterMin.toString();
    }
  }

  timerHourCallback(): void {
    this.CounterHour++;
    if (this.CounterHour < 10) {
      this.hours = '0' + this.CounterHour;
    } else {
      this.hours = this.CounterHour.toString();
    }
  }

  ngOnInit() {

    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });

    this.timer.newTimerHR(this.timerMsName, 10, 10);
    this.timer.newTimer(this.timerSecName, 1, true);
    this.timer.newTimer(this.timerMinName, 60, true);
    this.timer.newTimer(this.timerHourName, 3600, true);

    this.subscriptionTheme = this.SettingsService.sendTheme().subscribe(theme$ => {
      this.theme = theme$;
    });
    this.subscriptionSize = this.SettingsService.sendSize().subscribe(size$ => {
      this.level = size$;
      if (this.level === 4)
        this.levelShow = 1;
      else if (this.level === 6)
        this.levelShow = 2;
      else if (this.level === 8)
        this.levelShow = 3;
      else
        this.levelShow = 4;
      this.size = (size$ * 5) / 2;
      this.columns = size$;
    });

    if (this.theme.length == 0) 
      this.router.navigate(['/setup']);
    

    for (var i = 1; i <= this.size; i++) {
      this.pictures.push(this.random());
    }

    for (var i = 0; i < this.size; i++) {
      this.pictures.push(this.pictures[i]);
    }

    this.pictures.sort(function (a, b) { return 0.5 - Math.random() });
  }

  ngOnDestroy() {
    this.subscriptionTheme.unsubscribe();
    this.subscriptionSize.unsubscribe();
  }

}
