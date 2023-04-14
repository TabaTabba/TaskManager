import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Project } from 'app/models/project';
import { TaskPriority } from 'app/models/task-priority';
import { ProjectsService } from 'app/services/projects.service';
import { TaskPrioritiesService } from 'app/services/task-priorities.service';
import { LoginService } from 'app/services/login.service';
import { TasksService } from 'app/services/tasks.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit
{
  newTaskForm: FormGroup | any;
  projects: Observable<Project[]> | any;
  employees: Observable<any> | any;
  taskPriorities: Observable<TaskPriority[]> | any;
  
  constructor(private tasksService: TasksService, private router: Router, private projectsService: ProjectsService, private taskPrioritiesService: TaskPrioritiesService, private loginService: LoginService)
  {
  }

  ngOnInit()
  {
    this.newTaskForm = new FormGroup({
      taskID: new FormControl(0),
      taskName: new FormControl(null, [ Validators.required ]),
      description: new FormControl(null, []),
      projectID: new FormControl(null, [ Validators.required ]),
      assignedTo: new FormControl(null, [ Validators.required ]),
      taskPriorityID: new FormControl(2, [ Validators.required ])
    });

    this.projects = this.projectsService.getAllProjects();
    debugger
    this.employees = this.loginService.getAllEmployes();
    console.log(this.employees);
    console.log(this.projects);
    this.taskPriorities = this.taskPrioritiesService.getTaskPriorities();
  }

  onCreateTaskClick(event: any)
  {
    this.newTaskForm["submitted"] = true;

    if (this.newTaskForm.valid)
    {
      this.tasksService.insertTask(this.newTaskForm.value).subscribe(() => {
        this.router.navigate( [ "/employee", "tasks" ]);
      }, (error) => {
        console.log(error);
      });
    }
    else
    {
      console.log(this.newTaskForm.errors);
    }
  }
}