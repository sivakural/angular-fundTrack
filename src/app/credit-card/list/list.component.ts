import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/common/pagination.service';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  usedTotal: number = 0;
  paysTotal: number = 0;
  listToShow: any[] = [];
  deleteData: any;

  constructor(private utils: UtilsService, private router: Router, private paging: PaginationService) { }

  ngOnInit() {
    this.initialCalls();
  }

  initialCalls() {
    this.getUsedList();
    this.getPaysList();
  }

  getUsedList() {
    this.utils.getCreditCardUsedList().subscribe((res: []) => {
      this.listToShow = this.listToShow.concat(res);
      this.sortList();
      if (res.length) this.usedTotal = res.reduce((p, c: any) => { return p + c.amount }, 0);
    });
  }

  getPaysList() {
    this.utils.getCreditCardPaysList().subscribe((res: []) => {
      this.listToShow = this.listToShow.concat(res);
      this.sortList();
      if (res.length) this.paysTotal = res.reduce((p, c: any) => { return p + c.amount }, 0);
    });
  }

  sortList() {
    this.listToShow = this.listToShow.sort(function (a: any, b: any) {
      return +new Date(b.date) - +new Date(a.date);
    });
  }

  gotoEdit(date: Date) {
    const queryParams = { selectedDate: date };
    this.router.navigate(["/updateCredit"], { queryParams: queryParams });
  }

  deleteRecord(event: Event, data: any) {
    // To stop parent click event
    event.preventDefault();
    event.stopPropagation();

    this.deleteData = data;
    this.paging.modalOpen(1);
  }

  handleDelete(val: boolean) {
    if (val) {
      this.utils.deleteCreditCardUse(this.deleteData).subscribe(() => {
        console.log("successfully deleted...");
        this.listToShow = [];
        this.initialCalls();
      })
    }
  }
}
