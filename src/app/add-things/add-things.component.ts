import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {
  expenses,
  formatDate,
  keyIncludes
} from '../utils/utils';
import { FormService } from '../utils/form.service';
import { UtilsService } from '../utils/utils.service';

@Component({
  selector: 'app-add-things',
  templateUrl: './add-things.component.html',
  styleUrls: ['./add-things.component.css']
})
export class AddThingsComponent {
  categoreyList: any[] = expenses['categoreyList'];

  isEditMode: boolean = false;
  sendCreditCard: boolean = false;
  isCreditAmountExists: boolean = false;

  creditCardPayAmount: number = 0;
  today: string = new Date().toJSON().split('T')[0];

  thingsForm: FormGroup = this.fb.group({
    date: this.fb.control(formatDate(new Date()), Validators.required),
    things: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private utils: UtilsService, private location: Location, private route: ActivatedRoute, private formService: FormService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.selectedDate) {
        this.utils.commonGet('expense', 'get', { date: params.selectedDate }).subscribe(res => {
          this.thingsForm = this.formService.deriveForm(res, 'thingsForm');
          this.isEditMode = true;
          this.utils.commonGet('creditcardpay', 'get', { date: params.selectedDate }).subscribe(data => {
            if (data) {
              this.creditCardPayAmount = data.amount;
            }
          })
        })
      } else {
        this.addthings();
      }
    })
  }

  get thingsArr() {
    return this.thingsForm.get('things') as FormArray;
  }

  addthings(data?: any) {
    this.thingsArr.push(
      this.fb.group({
        categorey: [data ? data.categorey : '', Validators.required],
        categorey_value: [data ? data.categorey_value : '', Validators.required],
        subcategories: this.fb.array([])
      })
    );
  }

  getsubcategories(i: number): FormArray {
    if (this.thingsArr.at(i).get("subcategories")) {
      return this.thingsArr.at(i).get("subcategories") as FormArray;
    } else {
      let group = this.thingsArr.at(i) as FormGroup;
      group.addControl('subcategories', this.fb.array([]));
      return this.thingsArr.at(i).get("subcategories") as FormArray;
    }
  }

  addsubcategories(i: number, data?: any) {
    this.getsubcategories(i).push(this.fb.group({
      subcategorey: [data ? data.subcategorey : '', Validators.required],
      subcategorey_value: [data ? data.subcategorey_value : '', Validators.required]
    }))
  }

  gettos(i: number, j: number): FormArray {
    if (this.getsubcategories(i).at(j).get("to")) {
      return this.getsubcategories(i).at(j).get("to") as FormArray;
    } else {
      let group = this.getsubcategories(i).at(j) as FormGroup;
      group.addControl('to', this.fb.array([]));
      return this.getsubcategories(i).at(j).get("to") as FormArray;
    }
  }

  addtocategories(i: number, j: number) {
    this.gettos(i, j).push(this.fb.group({
      person: ['', Validators.required],
      amount: ['', Validators.required]
    }));
  }

  handleSelection(i: number) {
    let getValue: string = (this.thingsArr.at(i).get('categorey')?.value).toLowerCase();
    if (keyIncludes.includes(getValue)) {
      this.addsubcategories(i);
      this.updateFormField(this.getControl(this.thingsArr.at(i) as FormGroup, 'categorey_value'));
    } else {
      while (this.getsubcategories(i).length !== 0) {
        this.getsubcategories(i).removeAt(0)
      }
      this.updateFormField(this.getControl(this.thingsArr.at(i) as FormGroup, 'categorey_value'), true);
    }
  }

  handletoSelection(i: number, j: number) {
    let getValue: string = (this.getsubcategories(i).at(j).get('subcategorey')?.value).toLowerCase();
    if (keyIncludes.includes(getValue)) {
      this.addtocategories(i, j);
      this.updateFormField(this.getControl(this.getsubcategories(i).at(j) as FormGroup, 'subcategorey_value'));
    } else {
      while (this.gettos(i, j).length !== 0) {
        this.gettos(i, j).removeAt(0)
      }
      this.updateFormField(this.getControl(this.getsubcategories(i).at(j) as FormGroup, 'subcategorey_value'), true);
    }
  }

  getSubCategoriesList(i: number) {
    let getValue: string = (this.thingsArr.at(i).get('categorey')?.value).toLowerCase();
    return expenses[getValue];
  }

  removeControl(i: number, j?: any, k?: any) {
    if (k != undefined) {
      if (j == 0) {
        this.updateFormField(this.getControl(this.getsubcategories(i).at(j) as FormGroup, 'subcategorey'));
      }
      this.gettos(i, j).removeAt(k)
    } else if (j != undefined) {
      if (j == 0) {
        this.updateFormField(this.getControl(this.thingsArr.at(i) as FormGroup, 'categorey'));
      }
      this.getsubcategories(i).removeAt(j);
    } else {
      this.thingsArr.removeAt(i);
    }
  }

  getControl(group: FormGroup, control: string): FormControl {
    let ctrl = group.get(control)?.get(control) as FormControl;
    if (ctrl) return ctrl;
    group?.addControl(control, new FormControl(''));
    group?.updateValueAndValidity();
    return group.get(control) as FormControl;
  }

  updateFormField(control: FormControl, validateMust?: boolean) {
    control?.patchValue('');
    validateMust ? control?.addValidators([Validators.required]) : control?.clearValidators();
    control?.updateValueAndValidity();
  }

  checkSomeKey(fKey: string, i: number, j: number): any {
    if (fKey == "Credit Card") this.sendCreditCard = true;
    if (['Sent', "Give"].includes(fKey)) this.handletoSelection(i, j);
  }

  onSubmit() {
    let inputs = this.formService.removeEmpty(this.thingsForm.getRawValue(), this.creditCardEntry.bind(this));
    if (this.isEditMode) {
      delete inputs._id;
      this.utils.commonPut(inputs, 'expense', 'update').subscribe(() => {
        if (this.creditCardPayAmount && !this.isCreditAmountExists) {
          // delete credit card pay entry.
          this.utils.commonDelete('creditcardpay', 'delete', inputs.date).subscribe(() => {
            console.log("Successfully deleted credit card entry...");
            this.goto();
          });
        } else {
          this.goto();
        }
      });
    } else {
      this.utils.commonPost(inputs, 'expense', 'add').subscribe(() => {
        this.goto();
      });
    }
  }

  creditCardEntry(data: any) {
    let _self = this;
    _self.isCreditAmountExists = true;
    if (_self.sendCreditCard && data && data.subcategorey && (_self.creditCardPayAmount != data.subcategorey_value)) {
      let obj = {
        date: _self.thingsForm.value.date,
        amount: data.subcategorey_value,
        mode: "pay"
      }
      this.utils.commonPost(obj, 'creditcardpay', 'add').subscribe(() => {
        console.log("Successfully added credit card pay..");
      })
    }
  }

  goto() {
    this.location.back();
  }
}
