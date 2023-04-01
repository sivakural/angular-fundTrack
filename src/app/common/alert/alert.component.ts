import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  _statement: String = '';
  @Input()
  get statement() {
    return this._statement;
  }
  set statement(value) {
    this._statement = value;
  }
}
