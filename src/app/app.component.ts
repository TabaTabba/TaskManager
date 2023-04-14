import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLoggerService } from './services/router-logger.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fadeAnimation, slideUpAnimation, zoomUpAnimation, zoomLeftAnimation, slideLeftOrRightAnimation, keyFrameAnimation } from './my-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ fadeAnimation ]
})
export class AppComponent {
myProperty: any;
  constructor(public loginService: LoginService, private domSanitizer: DomSanitizer, private routerLoggerService: RouterLoggerService, private router: Router) {
  }
  title = 'TaskManager';
  
  ngOnInit(){
    this.loginService.detectIfAlreadyLoggedIn();

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        let userName = (this.loginService.currentUserName) ? this.loginService.currentUserName : "anonymous";

        let logMsg = new Date().toLocaleString() + ":" + userName + "navigates to " + event.url;

        this.routerLoggerService.log(logMsg);
      }
    });
  }

  onSearchClick()
  {
    console.log(this.loginService.currentUserName);
  }

  getState(outlet: RouterOutlet)
  {
    return outlet.isActivated ? outlet.activatedRoute.snapshot.url[0].path && outlet.activatedRouteData ["linkIndex"] : "none";
  }
}