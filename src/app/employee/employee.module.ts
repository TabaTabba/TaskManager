import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { TasksComponent } from './components/tasks/tasks/tasks.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { UpdateTaskStatusComponent } from './components/tasks/update-task-status/update-task-status.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';



@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  exports:[
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent
  ]
})
export class EmployeeModule { }
