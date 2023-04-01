import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/form.service';
import { UtilsService } from 'src/app/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showAlert: boolean = false
  alertStment: String = '';
  loginForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(1024)])
  })
  constructor(private fb: FormBuilder, private utils: UtilsService, private router: Router, private formService: FormService) { }

  login() {
    let inputs = this.formService.removeFormControlspace({...this.loginForm.value});
    this.utils.login(inputs).subscribe(res => {
      this.router.navigate(['/spendlist']);
    }, (err) => {
      this.showAlert = true;
      this.alertStment = err.error;
      setTimeout(() => {
        this.showAlert = !this.showAlert;
        this.alertStment = '';
      }, 1500);
    })
  }

}
