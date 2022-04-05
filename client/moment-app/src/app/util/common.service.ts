import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner/spinner.component';

const errorObj: any = {
  required: 'Field is Mandatory',
  email: 'Invalid Email',
  minlength: 'Invalid Mobile Number min length 10',
  maxlength: 'Invalid Mobile Number max length 10',
  password: 'Password doesnt match',
};

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  user: any = null;
  subscription!: Subscription;
  emitter: Subject<Boolean> = new Subject<Boolean>();
  constructor(private http: HttpService, private matDialog: MatDialog) {}

  setProfile() {
    this.subscription = this.http.getProfile().subscribe((x: any) => {
      this.user = x;
      this.emitter.next(true);
    });
  }

  getError(control: AbstractControl) {
    const errors = control?.errors;
    if (errors) {
      const keys = Object.keys(errors);
      if (keys.length > 0) {
        return errorObj[keys[0]];
      }
    }

    return '';
  }

  openSpinner() {
    this.matDialog.open(SpinnerComponent, {
      width: '',
      hasBackdrop: false,
    });
  }

  closeSpinner() {
    this.matDialog.closeAll();
  }
}
