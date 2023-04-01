import { Component, ElementRef, ViewChild } from '@angular/core';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @ViewChild('myButton') myButton!: ElementRef;
  @ViewChild('checkBox') checkBox!: ElementRef;

  constructor(private paging: PaginationService) {}

  ngAfterViewInit() {
    this.triggerClick();
  }

  triggerClick() {
    let el: HTMLButtonElement = this.myButton.nativeElement;
    el.click();
  }

  triggerClose(evt: Event) {
    let el: HTMLInputElement = this.checkBox.nativeElement;
    el.click();
    this.paging.modalOpen(0)
    return false;
  }

  triggerYes(evt: Event) {
    let el: HTMLInputElement = this.checkBox.nativeElement;
    el.click();
    this.paging.modalOpen(1)
    return false;
  }
}
