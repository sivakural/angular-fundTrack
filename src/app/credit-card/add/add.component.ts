import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/form.service';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  isEditMode: boolean = false;
  maxDate: Date = new Date();
  creditCardForm: FormGroup = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    amount: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required)
  });

  constructor(private location: Location, private util: UtilsService, private formService: FormService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params.selectedDate) {
        this.util.getCreditCardUse(params.selectedDate).subscribe((res) => {
          if (res) {
            if (res._id) delete res._id;
            if (res.__v != undefined) delete res.__v;
            if (res.user) delete res.user;
            this.creditCardForm = this.formService.deriveForm(res);
            this.isEditMode = true;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.util.updateCreditCardUse(this.creditCardForm.value).subscribe(() => {
        this.goto();
      })
    } else {
      this.util.addCreditUse(this.creditCardForm.value).subscribe(() => {
        this.goto();
      });
    }
  }

  goto() {
    this.location.back()
  }

}
