import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from '../common/pagination.service';
import { ICalender, calList, monthList } from '../utils/utils';
import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-spend-list',
  templateUrl: './spend-list.component.html',
  styleUrls: ['./spend-list.component.css']
})
export class SpendListComponent {
  listToShow: [] = [];
  calList: any = calList;
  currentMonth: string = '';
  @ViewChild("topnav")
  topNav!: ElementRef;

  constructor(private utils: UtilsService, private router: Router, private paging: PaginationService) { 
    this.currentMonth = this.paging.currentMonth;
  }

  ngOnInit() {
    this.getList();
    this.orderCalList();
  }

  private getList() {
    let obj: ICalender = {
      type: this.currentCal.toLowerCase(),
      month: ["Day", "Week"].includes(this.currentCal) ? monthList.indexOf(this.currentMonth) + 1 : 0,
      year: 0
    }
    this.utils.commonGet('expense', 'list', obj).subscribe(res => {
      res.forEach((val: any) => {
        val.things.forEach((item: any) => {
          if (item.subcategories) {
            const result = Object.values(item.subcategories.reduce((r: any, o: any) => (r[o.subcategorey]
              ? (r[o.subcategorey].subcategorey_value ? r[o.subcategorey].subcategorey_value += o.subcategorey_value : (o.to.forEach((val: any) => {
                let index = r[o.subcategorey].to.findIndex((oVal: any) => oVal.person == val.person);
                if (index>=0) {
                  r[o.subcategorey].to[index].amount += val.amount;
                } else r[o.subcategorey].to.push(val);
              })))
              : (r[o.subcategorey] = { ...o }), r), {}));
            item.subcategories = result;
          }
        });
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

  public activeCal(cal: string, callBackFn: any) {
    if (this.currentCal == cal) return;
    this.paging.currentCal = cal;
    this.orderCalList();
    callBackFn;

    this.getList();
  }

  get currentCal() {
    return this.paging.currentCal;
  }

  orderCalList() {
    this.calList.unshift(this.currentCal);
    this.calList = [...new Set(this.calList)]
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
