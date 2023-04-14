import { Pipe, PipeTransform } from '@angular/core';
import { Project } from 'app/models/project';

@Pipe({
  name: 'paging',
  pure: false
})
export class PagingPipe implements PipeTransform {

  transform(value: Project[], currentPageIndex: number, pageSize: number): any {
    if(value == null){
      return null;
    }

    let resultArray = [];
    for(let i = currentPageIndex * pageSize; i < (currentPageIndex + 1) * pageSize; i++){
      if(value[i]){
        resultArray.push(value[i]);
      }
    }

    return resultArray;
  }
}