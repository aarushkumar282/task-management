import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  constructor() {}
  public navModalClose = new BehaviorSubject<any>('');
  currentFilter = this.navModalClose.asObservable();

  navService() {
    this.navModalClose.next(true);
  }
}
