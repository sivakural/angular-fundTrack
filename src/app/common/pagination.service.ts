import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { monthList } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public monthList: any[] = monthList;
  public currentMonth: string = new Date().toLocaleString('default', { month: 'short' });
  public currentCal: string = "Day";
  public paginationList: Map<number, Array<any>>=  new Map<number, Array<any>>();
  public renderedQuarter: number = 0;

  // set observable for modal-dialog open
  canOpen = new Subject();

  constructor() {
    let count = 0;
    for (let i = 0; i < monthList.length; i++) {
      count += 1;
      if ((count % 3) == 0) this.paginationList.set(count, this.setArray(count))
    }
    this.getQuarter();
  }

  setArray(count: number) {
    let end: number = count - 1;
    let start: number = count - 3;
    return this.monthList.filter((val, index) => ((index >= start) && (index <= end)))
  }

  getQuarter() {
    for (let [key, value] of this.paginationList) {
      value.forEach(val => {
        if (val == this.currentMonth) {
          this.renderedQuarter = key;
          return;
        }        
      });
    }
  }

  showPagination(): any {
    return this.paginationList.get(this.renderedQuarter);
  }

  pagination(next: boolean) {
    if (next) {
      this.renderedQuarter += 3;
    } else {
      this.renderedQuarter -= 3;
    }
  }

  modalOpen(index: number) {
    return this.canOpen.next(index);
  }
  
}
