import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PaginationService } from '../pagination.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @ViewChild('myButton') myButton!: ElementRef;
  @ViewChild('checkBox') checkBox!: ElementRef;

  @Output() fireYes = new EventEmitter<boolean>();
  @Output() fireNo = new EventEmitter<boolean>();

  constructor(private paging: PaginationService) {
    // handle modal-dialog open
    this.paging.canOpen.subscribe((val) => {
      this.triggerClick();
    });
  }

  triggerClick() {
    let el: HTMLButtonElement = this.myButton.nativeElement;
    el.click();
  }

  triggerClose(evt: Event) {
    let el: HTMLInputElement = this.checkBox.nativeElement;
    el.click();
    this.fireNo.emit(false);
    return false;
  }

  triggerYes(evt: Event) {
    let el: HTMLInputElement = this.checkBox.nativeElement;
    el.click();
    this.fireYes.emit(true);
    return false;
  }
}
