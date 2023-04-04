import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public showAlert = new Subject<string>();

  constructor() { }

  public triggerAlert(error: string) {
    this.showAlert.next(error);
  }

}
