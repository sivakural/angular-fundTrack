import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../utils.service';
import {
  categoreyList, 
  amount, 
  medical, 
  maintanence, 
  fuel, 
  travel, 
  bill, 
  maligai, 
  nonveg, 
  buy, 
  insurance
} from '../utils';
import { FormService } from '../form.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-things',
  templateUrl: './add-things.component.html',
  styleUrls: ['./add-things.component.css']
})
export class AddThingsComponent {
  categoreyList: any[] = categoreyList;
  amount: any[] = amount;
  medical: any[] = medical;
  maintanence: any[] = maintanence;
  fuel: any[] = fuel;
  travel: any[] = travel;
  bill: any[] = bill;
  maligai: any[] = maligai;
  nonveg: any[] = nonveg;
  buy: any[] = buy;
  insurance: any[] = insurance;

  isEditMode: boolean = false;
  sendCreditCard: boolean = false;
  isCreditAmountExists: boolean = false;

  creditCardPayAmount: number = 0;

  thingsForm: FormGroup = this.fb.group({
    date: this.fb.control(this.formatDate(new Date()), Validators.required),
    things: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private utils: UtilsService, private location: Location, private route: ActivatedRoute, private formService: FormService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.selectedDate) {
        this.utils.getEntry({ date: params.selectedDate }).subscribe(res => {
          this.thingsForm = this.formService.deriveForm(res);
          this.isEditMode = true;
          this.utils.getCreditCardPay(params.selectedDate).subscribe(data => {
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

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
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

  handleSelection(i: number) {
    let getValue: string = (this.thingsArr.at(i).get('categorey')?.value).toLowerCase();
    if (["amount", "maintanance", "medical", "fuel", "travel", "bill payments", "maligai", "nonveg", "buy", "insurance"].includes(getValue)) {
      this.addsubcategories(i);
      this.updateFormField(this.thingsArr.at(i).get('categorey_value'));
    } else {
      this.updateFormField(this.thingsArr.at(i).get('categorey_value'), true);
    }
  }

  getSubCategoriesList(i: number) {
    let getValue: string = (this.thingsArr.at(i).get('categorey')?.value).toLowerCase();
    let list = [];
    switch (getValue) {
      case "amount": {
        list = this.amount;
        break;
      }
      case "maintanance": {
        list = this.maintanence;
        break;
      }
      case "medical": {
        list = this.medical;
        break;
      }
      case "fuel": {
        list = this.fuel;
        break;
      }
      case "travel": {
        list = this.travel;
        break;
      }
      case "maligai": {
        list = this.maligai;
        break;
      }
      case "nonveg": {
        list = this.nonveg;
        break;
      }
      case "buy": {
        list = this.buy;
        break;
      }
      case "insurance": {
        list = this.insurance;
        break;
      }
      default: {
        list = this.bill;
        break;
      }
    }
    return list;
  }

  removeControl(i: number, j?: number) {
    if (j != undefined) {
      if (j == 0) {
        this.updateFormField(this.thingsArr.at(i).get('categorey'))
      }
      this.getsubcategories(i).removeAt(j);
    } else {
      this.thingsArr.removeAt(i);
    }
  }

  updateFormField(control: AbstractControl | null, validateMust?: boolean) {
    let ctrl = control as FormControl;
    ctrl?.patchValue('');
    validateMust ? ctrl?.addValidators([Validators.required]) : ctrl?.clearValidators();
    ctrl?.updateValueAndValidity();
  }

  checkSomeKey(fKey: String) {
    if (fKey == "Credit Card") this.sendCreditCard = true;
  }

  onSubmit() {
    let inputs = this.formService.removeEmpty(this.thingsForm.value, this.creditCardEntry.bind(this));
    if (this.isEditMode) {
      delete inputs._id;
      this.utils.update(inputs).subscribe(() => {
        if (this.creditCardPayAmount && !this.isCreditAmountExists) {
          // delete credit card pay entry.
          this.utils.deleteCreditCardPay(inputs.date).subscribe(() => {
            console.log("Successfully deleted credit card entry...")
          });
        }
        this.goto();
      });
    } else {
      this.utils.addData(inputs).subscribe(() => {
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
      this.utils.addCreditPay(obj).subscribe(() => {
        console.log("Successfully added credit card pay..");
      })
    }
  }

  goto() {
    this.location.back();
  }
}
