import { Component } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-personal-loanlist',
  templateUrl: './personal-loanlist.component.html',
  styleUrls: ['./personal-loanlist.component.css']
})
export class PersonalLoanlistComponent {
 loanList: any[] = [];
 paidTotal: number = 0;

 constructor(private utilService: UtilsService) {}

 ngOnInit() {
  this.utilService.commonGet('personaloan', 'list').subscribe((res) => {
    if (res) this.loanList = res;
    if (res.length) this.paidTotal = res.reduce((p: any, c: any) => { return p + c.amount }, 0);
  })
 }
}
