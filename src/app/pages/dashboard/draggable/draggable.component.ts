import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskSaverService } from '../../../shared/task-saver.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ConfirmDialogComponent } from '../../../layout/confirm-dialog/confirm-dialog.component';
import { StorageService } from '../../../shared/storage-service/storage.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragExit,
  CdkDragEnter
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss']
})
export class DraggableComponent implements OnInit {
  @Output() dragged = new EventEmitter();
  todo = [];
  progress = [];
  done = [];

  constructor(
    private Tasksaverservice: TaskSaverService,
    private dialog: MatDialog,
    private ls: StorageService
  ) {
    this.Tasksaverservice.currentFilter.subscribe(result => {
      console.log('data from service', result);
      this.todo = [];
      this.progress = [];
      this.done = [];
      if (result) {
        result.forEach(element => {
          if (element.status === 'TODO') {
            this.todo.push(element);
          } else if (element.status === 'IN_PROGRESS') {
            this.progress.push(element);
          } else {
            this.done.push(element);
          }
        });
      }
      this.dragged.emit(result);
    });
  }

  ngOnInit() {
    let data = this.ls.getData();
    if (data) {
      data.forEach(ele => {
        if (ele.status === 'TODO') {
          this.todo.push(ele);
        } else if (ele.status === 'IN_PROGRESS') {
          this.progress.push(ele);
        } else {
          this.done.push(ele);
        }
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('drop', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if (event.container.id !== event.previousContainer.id) {
        let getData = this.ls.getData();
        getData.forEach(element => {
          if (element.id === event.item.data.id) {
            if (event.container.id === 'IN_PROGRESS') {
              element['status'] = 'IN_PROGRESS';
            } else if (event.container.id === 'TODO') {
              element['status'] = 'TODO';
            } else {
              element['status'] = 'DONE';
            }
          }
        });
        this.ls.setData(getData);
        this.dragged.emit(getData);
      }
    }
  }

  openDialog(item): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  deletedata(item): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result === true) {
        let datas = this.ls.getData();
        datas.forEach((element, idx) => {
          if (element.id === item.id) {
            datas.splice(idx, 1);
          }
        });
        this.ls.setData(datas);
        this.Tasksaverservice.filtersAddData(datas);
      }
    });
  }
}
