import { Injectable } from '@angular/core';
import { AddTaskComponent } from '../pages/dashboard/add-task/add-task.component';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskSaverService {
  constructor() {}

  private _listnersDate = new Subject<any>();
  public FiltersSourceData = new BehaviorSubject<any>('');
  currentFilter = this.FiltersSourceData.asObservable();

  filtersAddData(data) {
    debugger;
    this.FiltersSourceData.next(data);
  }
}
