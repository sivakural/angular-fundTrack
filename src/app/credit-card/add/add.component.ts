import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/utils/form.service';
import { formatDate } from 'src/app/utils/utils';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  isEditMode: boolean = false;
  maxDate: string = new Date().toJSON().split('T')[0];

  creditCardForm: FormGroup = new FormGroup({
    date: new FormControl(formatDate(new Date()), Validators.required),
    amount: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required)
  });

  constructor(private location: Location, private util: UtilsService, private formService: FormService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params.selectedDate) {
        this.util.commonGet('creditcarduse', 'get',{ date:  params.selectedDate }).subscribe((res) => {
          if (res) {
            this.creditCardForm = this.formService.deriveForm(res, 'creditCardForm');
            this.isEditMode = true;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.util.commonPut(this.creditCardForm.getRawValue(), 'creditcarduse', 'update').subscribe(() => {
        this.goto();
      })
    } else {
      this.util.commonPost(this.creditCardForm.value, 'creditcarduse', 'add').subscribe(() => {
        this.goto();
      });
    }
  }

  goto() {
    this.location.back()
  }

}
