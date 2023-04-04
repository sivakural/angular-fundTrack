import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formKeys, formatDate } from './utils';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  constructor(private fb: FormBuilder) { }

  public removeEmpty(list: any, callBack: Function) {
    if (Array.isArray(list)) {
      list.forEach((obj) => {
        this.removeEmpty(obj, callBack);
      })
    } else if (typeof list === "object") {
      for (let prop in list) {
        if (list[prop] == "") { delete list[prop] }
        else if (list[prop] == "Credit Card") { callBack(list) }
        else { this.removeEmpty(list[prop], callBack) }
      }
    }
    return list;
  }

  removeFormControlspace(list: any) {
    for (let prop in list) {
      list[prop] = list[prop].replace(/\s/g, "");
    }
    return list;
  }

  public deriveForm(data: any, formName?: any): any {
    if (Array.isArray(data)) {
      let arrayForm: FormArray = this.fb.array([]);
      data.forEach((val: any) => {
        let group: FormGroup = this.fb.group({});
        for (let key in val) {
          if (Array.isArray(val[key])) {
            group.addControl(key, this.deriveForm(val[key]))
          } else {
            group.addControl(key, this.fb.control(val[key], [Validators.required]))
          }
        }
        arrayForm.push(group);
      })
      return arrayForm;
    } else {
      let baseForm: FormGroup = this.fb.group({});
      Object.keys(data).forEach((val: any) => {
        if (!formKeys[formName].includes(val)) {
          delete data[val]
        } else {
          if (Array.isArray(data[val])) {
            baseForm.addControl(val, this.deriveForm(data[val]));
          } else {
            baseForm.addControl(val, this.fb.control(data[val], [Validators.required]));
            this.disabledWhenEdit(val, baseForm.get(val) as FormControl);
          }
        }
      });
      return baseForm;
    }
  }

  disabledWhenEdit(key: string, control: FormControl) {
    switch (key) {
      case 'date':
        let val = formatDate(control.value);
        control.patchValue(val);
        control.disable({ onlySelf: true })
        break;
      case 'reason':
        control.disable({ onlySelf: true })
        break;
    }
    return control;
  }

}
