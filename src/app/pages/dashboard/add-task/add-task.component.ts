import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskSaverService } from '../../../shared/task-saver.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../../../shared/storage-service/storage.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  task = [];
  addTask: FormGroup;
  submitted = false;
  min: any;

  constructor(
    private fb: FormBuilder,
    private Tasksaverservice: TaskSaverService,
    private ls: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    this.min = new Date();
  }

  ngOnInit(): void {
    this.addTask = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      priority: ['', Validators.required],
      picker: ['', Validators.required],
      status: ['']
    });
    if (this.data) this.addTask.patchValue(this.data);
  }

  get f() {
    return this.addTask.controls;
  }
  onSubmit() {
    debugger;
    /**  To update the item based on their id.
    /*there will be seprate component for this functionality
    /* do not mix add and edit in same component for better
    /*understanding of code and to reduce complexity...
    */
    if (this.data) {
      let update = this.ls.getData();
      update.forEach((element, idx) => {
        if (element.id === this.data.id) {
          Object.assign(element, this.addTask.value);
        }
      });
      this.ls.setData(update);
      this.Tasksaverservice.filtersAddData(update);
      this.dialogRef.close(true);
    } else {
      this.submitted = true;
      // stop here if form is invalid
      if (this.addTask.invalid) {
        return;
      }

      if (this.ls.getData() !== '' && this.ls.getData() !== null) {
        this.task = [];
        let taskrecord = this.ls.getData();
        debugger;
        taskrecord.forEach(element => {
          this.task.push(element);
        });
        this.addTask.value.status = 'TODO';
        this.addTask.value.id = Math.floor(Math.random() * 1000);
        this.task.push(this.addTask.value);
        this.ls.setData(this.task);
        this.Tasksaverservice.filtersAddData(this.task);
        this.dialogRef.close(true);
      } else {
        this.addTask.value.status = 'TODO';
        this.addTask.value.id = Math.floor(Math.random() * 1000);
        this.task.push(this.addTask.value);
        this.Tasksaverservice.filtersAddData(this.task);
        this.ls.setData(this.task);
        this.dialogRef.close(true);
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(true);
  }
}
