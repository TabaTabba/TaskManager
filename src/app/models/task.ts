import { Project } from './project';

export class Task
{
    taskID: number | any;
    taskName: string | any;
    description: string | any;
    createdOn: string | any;
    projectID: number | any;
    createdBy: string | any;
    assignedTo: string | any;
    taskPriorityID: number | any;
    lastUpdatedOn: number | any;
    currentStatus: number | any;
    currentTaskStatusID: number | any;

    project: Project | any;
    createdByUser: any;
    assignedToUser: any;
    taskStatusDetails: any;

    constructor()
    {
        this.taskID = null;
        this.taskName = null;
        this.description = null;
        this.createdOn = null;
        this.projectID = null;
        this.createdBy = null;
        this.assignedTo = null;
        this.taskPriorityID = null;
        this.lastUpdatedOn = null;
        this.currentStatus = null;

        this.project = null;
        this.createdByUser = null;
        this.assignedToUser = null;
        this.taskStatusDetails = null;
        this.taskStatusDetails = null;
        this.currentTaskStatusID = null;
    }
}