import { ToastService } from './util/toast.service';
import { Router } from '@angular/router';
import { HttpService } from './util/http.service';
import { CommonService } from './util/common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public common: CommonService,
    private http: HttpService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  logout(): void {
    this.http.logout().subscribe((x: any) => {
      this.common.user = null;
      this.toast.showMessage('Logged out successfully', 1);
      this.router.navigate(['/login']);
    });
  }
}
