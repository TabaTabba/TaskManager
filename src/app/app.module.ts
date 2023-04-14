import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtUnAuthorizedInterceptorService } from './interceptors/jwt-un-authorized-interceptor.service';
import { AlertDirective } from './directives/alert.directive';
import { EmployeeModule } from './employee/employee.module';
import { RepeaterDirective } from './directives/repeater.directive';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SharedModule } from './shared/shared.module';
import { CountriesComponent } from './admin/components/countries/countries.component';
import { AboutComponent } from './admin/components/about/about.component';
import { ClientLocationsComponent } from './admin/components/client-locations/client-locations.component';
import { TaskPrioritiesComponent } from './admin/components/task-priorities/task-priorities.component';
import { TaskStatusComponent } from './admin/components/task-status/task-status.component';
import { MastersComponent } from './admin/components/masters/masters.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AlertDirective,
    RepeaterDirective,
    AboutComponent,
    CountriesComponent,
    ClientLocationsComponent,
    TaskPrioritiesComponent,
    TaskStatusComponent,
    MastersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EmployeeModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return (sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser") as string).token: null);
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtUnAuthorizedInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }