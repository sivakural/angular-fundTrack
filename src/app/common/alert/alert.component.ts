import { Component, Input } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  statement: String = '';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    // handle alert observable
    const alerts = this.alertService.showAlert.subscribe({
      next: (msg) => {
        this.statement = msg;
        setTimeout(() => {
          this.statement = '';
        }, 1500);
      }
    });
  }
}
