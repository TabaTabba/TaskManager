import { Task } from './task';

export class GroupedTask
{
    taskStatusName: number | any;
    tasks: Task[] | any;

    constructor()
    {
        this.taskStatusName = null;
        this.tasks = null;
    }
}
