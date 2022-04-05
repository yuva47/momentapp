import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  showMessage(message: string, type: number) {
    const duration = type ? 5000 : 2500;
    this._snackBar.open(message, 'x', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
