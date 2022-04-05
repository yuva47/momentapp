import { Router } from '@angular/router';
import { HttpService } from './../../util/http.service';
import { CommonService } from 'src/app/util/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-moments-list',
  templateUrl: './moments-list.component.html',
  styleUrls: ['./moments-list.component.scss'],
})
export class MomentsListComponent implements OnInit {
  subscription!: Subscription;
  subscription1!: Subscription;
  displayedColumns: string[] = ['slno', 'name', 'image', 'tags', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private common: CommonService,
    private http: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.common.user) {
      this.common.setProfile();
      this.subscription = this.common.emitter.subscribe((x) => {
        this.loadTable();
      });
    } else {
      this.loadTable();
    }
  }

  ngAfterViewInit() {}

  loadTable() {
    this.common.openSpinner();
    this.subscription1 = this.http.getMomentList().subscribe((x: any) => {
      x = x.map((x: any, i: number) => {
        x.slno = i + 1;
        return x;
      });
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.common.closeSpinner();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription?.unsubscribe();
    this.subscription1?.unsubscribe();
  }

  delete(id: any) {
    this.http.deleteMoment(id).subscribe((x) => {
      this.loadTable();
    });
  }

  navigate(id: any) {
    this.router.navigate(['/moment/' + id]);
  }
}
