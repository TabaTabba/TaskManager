import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Task } from 'app/models/task';
import { TaskStatusesService } from 'app/services/task-statuses.service';
import { TasksService } from 'app/services/tasks.service';
import { TaskStatusDetail } from 'app/models/task-status-detail';
import { TaskStatus } from 'app/models/task-status';

@Component({
  selector: 'app-update-task-status',
  templateUrl: './update-task-status.component.html',
  styleUrls: ['./update-task-status.component.scss']
})
export class UpdateTaskStatusComponent implements OnInit {
  //Properties to represent taskstatusdetails
  taskID: number | any;
  currentTask: Task = new Task();
  currentTaskStatusDetail: TaskStatusDetail = new TaskStatusDetail();
  editTaskStatusForm: FormGroup | any;
  taskStatuses: Observable<TaskStatus[]> | any;

  constructor(private tasksService: TasksService, private router: Router, private taskStatuesService: TaskStatusesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    //Receive taskid parameter
    this.activatedRoute.params.subscribe((params) => {
      this.taskID = params["taskid"];
    });

    //Create reactive form
    this.editTaskStatusForm = new FormGroup({
      thisStatusDetailID: new FormControl(0),
      taskID: new FormControl(null),
      taskStatusID: new FormControl(null, [Validators.required]),
      description: new FormControl(null)
    });

    //get taskstatuses from db for dropdownlist
    this.taskStatuses = this.taskStatuesService.getTaskStatuses();

    //get task by taskid
    this.tasksService.getTaskByTaskID(this.taskID).subscribe((task: Task) => {
      this.currentTask = task;

      //Load task details into Reactive form
      this.currentTaskStatusDetail.taskID = this.taskID;
      this.currentTaskStatusDetail.description = null;
      this.currentTaskStatusDetail.taskStatusID = task.currentTaskStatusID;
      this.currentTaskStatusDetail.taskStatusDetailID = 0;
      console.log(this.currentTaskStatusDetail);
      this.editTaskStatusForm.patchValue(this.currentTaskStatusDetail);
    });
  }

  onUpdateTaskStatusClick(event: any) {
    this.editTaskStatusForm["submitted"] = true;

    if (this.editTaskStatusForm.valid) {
      //send REST-API call to server
      this.tasksService.updateTaskStatus(this.editTaskStatusForm.value).subscribe((response) => {
        this.router.navigate(["/employee", "tasks"]);
      }, (error) => {
        console.log(error);
      });
    }
    else {
      console.log(this.editTaskStatusForm.errors);
    }
  }
}