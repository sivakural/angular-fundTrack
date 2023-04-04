import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/utils/form.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(1024)])
  });

  constructor(private fb: FormBuilder, private utils: UtilsService, private router: Router, private formService: FormService) { }

  public login() {
    let inputs = this.formService.removeFormControlspace({...this.loginForm.value});
    this.utils.commonPost(inputs, 'user', 'login').subscribe(() => {
      this.router.navigate(['/spendlist']);
    })
  }

}
