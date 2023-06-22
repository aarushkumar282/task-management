import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { StorageService } from '../../shared/storage-service/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  completedPer: any;
  constructor(private ls: StorageService) {}

  ngOnInit(): void {
    let data = this.ls.getData();
    this.taskStatus(data);
  }

  taskStatus(event: any) {
    if (event) {
      let totalTask = event.length;
      let compTask = 0;
      event.forEach(element => {
        if (element.status === 'DONE') {
          compTask++;
        }
      });
      this.completedPer = compTask / totalTask;
    }
  }
}
