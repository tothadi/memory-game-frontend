import { Injectable } from '@angular/core';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  public theme$ = new Rx.BehaviorSubject('dogs');
  public size$ = new Rx.BehaviorSubject(4);

  constructor() {
  }

  public getSettings(theme: string, size: number) {
    this.theme$.next(theme);
    this.size$.next(size);
  }

  sendTheme() {
    return this.theme$;
  }

  sendSize() {
    return this.size$;
  }

}
