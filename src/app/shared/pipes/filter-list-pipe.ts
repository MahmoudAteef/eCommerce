import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(list : any[],term:string): any[] {
    return list.filter((item)=> {return item.title.toLowerCase().includes(term.toLowerCase())});
  }

}
