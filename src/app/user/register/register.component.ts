import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from 'src/app/utils/form.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  showAlert: boolean = false
  alertStment: String = '';
  registerForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(102)])
  });

  constructor(private fb: FormBuilder, private util: UtilsService, private router: Router, private formService: FormService) { }

  register() {
    let inputs = this.formService.removeFormControlspace({...this.registerForm.value});
    this.util.addUser(inputs).subscribe(res => {
      this.router.navigate(['/'])
    }, (err) => {
      console.log(err);
      this.showAlert = true;
      this.alertStment = err.error;
      setTimeout(() => {
        this.showAlert = !this.showAlert;
        this.alertStment = '';
      }, 1500);
    })
  }
}
