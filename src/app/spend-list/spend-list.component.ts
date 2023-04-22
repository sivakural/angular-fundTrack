import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from '../common/pagination.service';
import { ICalender, calList, groupKeys, monthList, yearList } from '../utils/utils';
import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-spend-list',
  templateUrl: './spend-list.component.html',
  styleUrls: ['./spend-list.component.css']
})
export class SpendListComponent {
  listToShow: any[] = [];
  calList: any[] = calList;
  years: any[] = yearList
  currentMonth: string;
  currentCal: string;
  currentYear: number;
  @ViewChild("topnav")
  topNav!: ElementRef;

  constructor(private utils: UtilsService, private router: Router, private paging: PaginationService) { 
    this.currentMonth = this.paging.currentMonth;
    this.currentCal = this.paging.currentCal;
    this.currentYear = this.paging.currentYear;
  }

  ngOnInit() {
    this.getList();
  }

  private getList() {
    let obj: ICalender = {
      type: this.currentCal.toLowerCase(),
      month: ["Day", "Week"].includes(this.currentCal) ? monthList.indexOf(this.currentMonth) + 1 : 0,
      year: this.currentYear
    }
    this.utils.commonGet('expense', 'list', obj).subscribe(res => {
      res.forEach((val: any) => {
        val = groupKeys(val);
      });
      this.listToShow = res;
    })
  }

  public gotoEdit(date: any, contentRef: HTMLTableRowElement) {
    if (this.currentCal == "Day") {
      const queryParams = { selectedDate: date };
      this.router.navigate(["/updatethings"], { queryParams: queryParams });
    } else {
      if (contentRef.style.display === "table-row") {
        contentRef.style.display = "none";
      } else {
        contentRef.style.display = "table-row";
      }
    }
  }

  public activeCal() {
    if (this.paging.currentCal == this.currentCal) return;
    this.paging.currentCal = this.currentCal;

    this.getList();
  }

  public activeYr() {
    if (this.paging.currentYear == this.currentYear) return;
    this.paging.currentYear = this.currentYear;

    this.getList();
  }

  shownonSubCategorey(items: any[]) {
    items = items.filter((val: any) => {
      if (val.subcategories) {
        if (val.subcategories.length) return false;
        return true;
      } else {
        return true;
      }
    });
    return items
  }

  showSubCategorey(items: any[]) {
    items = items.filter((val: any) => {
      if (val.subcategories) {
        if (val.subcategories.length) return true;
        return false
      } else {
        return false;
      }
    });
    return items
  }

  setCurrentMonth(val: any) {
    this.currentMonth = val;
    this.getList()
  }

  handleClass(topNav: Element) {
    let x: any = topNav;
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  public getTotalAmount(obj: any): any {
    if (!obj.to) return obj.subcategorey_value;
    let total = obj.to.map((val: any) => val.amount).reduce((prev: any, nxt: any) => prev + nxt);
    return total;
  }
}
