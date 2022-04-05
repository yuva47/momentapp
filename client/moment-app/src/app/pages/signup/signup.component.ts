import { HttpService } from './../../util/http.service';
import { ToastService } from './../../util/toast.service';
import { CommonService } from './../../util/common.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  isPassword = true;
  cities = ['Bangalore', 'Chennai', 'Mumbai', 'Delhi'];
  subscription!: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    public common: CommonService,
    private toast: ToastService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      mobile: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      city: [''],
      password: [''],
      cpassword: ['', [cPassword()]],
    });
  }

  onSubmit() {
    this.common.openSpinner();
    if (this.form.valid) {
      let body = this.form.value;
      delete body['cpassword'];
      this.subscription = this.http.signUp(body).subscribe((x: any) => {
        console.log(x);
        this.common.closeSpinner();

        this.router.navigate(['login']);
      });
    } else {
      this.toast.showMessage('Fill all the details', 1);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription?.unsubscribe();
  }
}

function cPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control.parent?.value.password != control.value);
    return control.parent?.value.password != control.value
      ? { password: 'Password doesnt Match' }
      : null;
  };
}
