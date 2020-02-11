import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import * as uniqueRandom from 'unique-random-at-depth';
import * as $ from 'jquery';
import { SimpleTimer } from 'ng2-simple-timer';
import { ResultService, Result } from '../result.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    username: '',
    fullname: '',
    password: ''
  };

  regError = false;
  errorMessage = '';

  firstTens = [];
  pictures = [];
  theme = 'nature';
  size = 10;
  random = uniqueRandom(1, 30, 30);
  firstPicId: number;
  secondPicId: number;
  showFirst = false;
  firstClick = true;
  gameEnded = false;
  matchCount = 0;
  time;
  timeInMs: number;
  points: number;

  CounterMs = 0;
  milliseconds = 0;
  timerMsId: string;
  timerMsName: string = '1 ms'

  CounterSec = 0;
  seconds = '00';

  CounterMin = 0;
  minutes = '00';

  CounterHour = 0;
  hours = '00';

  constructor(private auth: AuthenticationService, private router: Router, private timer: SimpleTimer, private ResultService: ResultService) {

  }

  start() {

    this.pictures = [];
    this.showFirst = false;
    this.firstClick = true;
    this.gameEnded = false;
    this.matchCount = 0;

    this.CounterMs = 0;
    this.milliseconds = 0;
    this.CounterSec = 0;
    this.seconds = '00';
    this.CounterMin = 0;
    this.minutes = '00';
    this.CounterHour = 0;
    this.hours = '00';

    this.timerMsId = '';

    this.timer.newTimerHR(this.timerMsName, 10, 10);

    for (var i = 1; i <= this.size; i++) {
      this.pictures.push(this.random());
    }

    for (var i = 0; i < this.size; i++) {
      this.pictures.push(this.pictures[i]);
    }

    this.pictures.sort(function (a, b) { return 0.5 - Math.random() });

  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      let resultBlock: Result = { username: this.credentials.username, time: this.timeInMs, level: 1, date: new Date(), points: this.points };
      this.ResultService.addResult(resultBlock).subscribe(result => {
      });
      this.router.navigateByUrl('/setup');
    }, (err) => {
      this.errorMessage = err.error.message;
      this.regError = true;
    });
  }



  closeError() {
    this.errorMessage = '';
    this.regError = false;
  }

  closeDemo() {
    this.start();
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
        this.points = Math.round((1 / this.timeInMs) * 1000000000 * 4);
        setTimeout(() => {
          this.delAllTimers();
          this.gameEnded = true;
        }, 2000);
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
  }

  unSubscribeTimers() {
    this.timer.unsubscribe(this.timerMsId);
  }

  delAllTimers() {
    this.timer.delTimer(this.timerMsName);
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

  timerMsCallback(): void {
    this.CounterMs++;
    if (this.CounterMs === 100) {
      this.CounterMs = 0;
      this.CounterSec++;
    }
    if (this.CounterSec === 60) {
      this.CounterSec = 0;
      this.CounterMin++;
    }
    if (this.CounterMin === 60) {
      this.CounterMin = 0;
      this.CounterHour++;
    }
    if (this.CounterSec === 60){
      this.CounterSec = 0;
      this.CounterSec++;
    }
    
    this.milliseconds = this.CounterMs;

    if (this.CounterSec < 10) 
      this.seconds = '0' + this.CounterSec;
    else
      this.seconds = this.CounterSec.toString();
    
    if (this.CounterMin < 10) 
      this.minutes = '0' + this.CounterMin;
    else
      this.minutes = this.CounterMin.toString();
    
    if (this.CounterHour < 10) 
      this.hours = '0' + this.CounterHour;
    else
      this.hours = this.CounterHour.toString();
    
  }

  ngOnInit() {

    this.start();

    this.ResultService.getTopResults().subscribe(result => {
      let results = JSON.parse(result);
      for (var i = 0; i < 10; i++) {
        this.firstTens.push(results[i]);
      }
    }, (err) => {
      console.error(err);
    });

  }

}
