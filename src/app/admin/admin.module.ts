import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { DashboardService } from 'app/services/dashboard.service';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import { CheckBoxPrinterComponent } from './components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { CountriesComponent } from './components/countries/countries.component';
import { ClientLocationsComponent } from './components/client-locations/client-locations.component';
import { TaskPrioritiesComponent } from './components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './components/task-status/task-status.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent
  ],
  imports: [
    SharedModule, AdminRoutingModule
  ],
  exports: [ DashboardComponent, MyProfileComponent, ProjectsComponent, ProjectDetailsComponent ],
  providers: [ DashboardService ],
  entryComponents: [ CountriesComponent, ClientLocationsComponent, TaskPrioritiesComponent, TaskStatusComponent ]
})
export class AdminModule { }