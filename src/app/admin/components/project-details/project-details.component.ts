import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'app/models/project';
import { ProjectsService } from 'app/services/projects.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit{

  project: Project;
  routeParmsSubscription: Subscription | any = null;

  constructor(private activatedRoute: ActivatedRoute, private projectsService: ProjectsService) 
  {
    this.project = new Project();
  }

  ngOnInit(): void {
    this.routeParmsSubscription = this.activatedRoute.params.subscribe((params) => {
      let pid = params["projectid"];
      this.projectsService.getProjectByProjectID(pid).subscribe((proj:Project) => {
        this.project = proj;
      });
    });
  }

  ngOnDestroy()
  {
    this.routeParmsSubscription.unsubscribe();
  }
}