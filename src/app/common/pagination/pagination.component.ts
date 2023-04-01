import { Component, EventEmitter, Output } from '@angular/core';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Output() setMonth = new EventEmitter<string>();

  constructor(private paging: PaginationService) {}

  paginationHandle(up: boolean) {
    this.paging.pagination(up)
  }

  get paginationList() {
    return this.paging.showPagination();
  }

  get currentMonth() {
    return this.paging.currentMonth;
  }

  get renderedQuarter() {
    return this.paging.renderedQuarter;
  }

  get currentCal() {
    return this.paging.currentCal;
  }

  selectMon(mon: string) {
    this.paging.currentMonth = mon;
    this.paging.getQuarter();
    this.setMonth.emit(this.currentMonth);
  }
}
