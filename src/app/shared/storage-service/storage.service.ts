import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  setData(item: any) {
    localStorage.setItem('task', JSON.stringify(item));
  }

  getData() {
    let task = JSON.parse(localStorage.getItem('task'));
    return task;
  }

  updateData() {}
}
