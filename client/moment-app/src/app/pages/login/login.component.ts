import { Router } from '@angular/router';
import { ToastService } from './../../util/toast.service';
import { HttpService } from './../../util/http.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/util/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isPassword = true;
  form!: FormGroup;
  subscription!: Subscription;
  constructor(
    public common: CommonService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toast: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.common.openSpinner();
    if (this.form.valid) {
      const body = this.form.value;
      this.subscription = this.http.login(body).subscribe((x: any) => {
        console.log(x);
        this.common.user = x;
        this.toast.showMessage('Login Success', 0);
        this.router.navigate(['/momentList']);
        this.common.closeSpinner();
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
