import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/common/confirmation-dialog/confirmation-dialog.component';
import { PaginationService } from 'src/app/common/pagination.service';
import { HostDirective } from 'src/app/directives/host.directive';
import { UtilsService } from 'src/app/utils/utils.service';

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

  @ViewChild(HostDirective, { static: true }) appHost!: HostDirective;
  

  constructor(private utils: UtilsService, private router: Router, private paging: PaginationService) { 
     // handle modal-dialog open
     this.paging.canOpen.subscribe((val: any) => {
      this.handleDelete(val);

      // remove modal-dialog component after done with box.
      this.appHost.viewContainerRef.remove();
    });
  }

  ngOnInit() {
    this.initialCalls();
  }

  initialCalls() {
    this.getUsedList();
    this.getPaysList();
  }

  getUsedList() {
    this.utils.commonGet('creditcarduse', 'list').subscribe((res: []) => {
      this.listToShow = this.listToShow.concat(res);
      this.sortList();
      if (res.length) this.usedTotal = res.reduce((p, c: any) => { return p + c.amount }, 0);
    });
  }

  getPaysList() {
    this.utils.commonGet('creditcardpay', 'list').subscribe((res: []) => {
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

  gotoEdit(data: any) {
    if (data.mode) return;
    const queryParams = { selectedDate: data.date };
    this.router.navigate(["/updateCredit"], { queryParams: queryParams });
  }

  deleteRecord(event: Event, data: any) {
    // To stop parent click event
    event.preventDefault();
    event.stopPropagation();

    this.deleteData = data;

    // Create modal-dialog when delete record.
    const viewContainerRef = this.appHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(ConfirmationDialogComponent);
  }

  handleDelete(val: any) {
    if (val) {
      this.utils.commonDelete('creditcarduse', 'delete', this.deleteData).subscribe(() => {
        console.log("successfully deleted...");
        this.listToShow = [];
        this.initialCalls();
      });
    }
  }
}
