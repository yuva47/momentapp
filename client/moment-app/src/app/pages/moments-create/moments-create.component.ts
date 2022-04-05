import { ToastService } from './../../util/toast.service';
import { HttpService } from './../../util/http.service';
import { CommonService } from 'src/app/util/common.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-moments-create',
  templateUrl: './moments-create.component.html',
  styleUrls: ['./moments-create.component.scss'],
})
export class MomentsCreateComponent implements OnInit {
  subscription!: Subscription;
  isEdit = false;
  tags: any[] = [];
  addOnBlur = true;
  form!: FormGroup;
  title = '';
  fileName = '';
  file: any = null;
  momentId: any = null;
  subscription1!: Subscription;
  constructor(
    public common: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
    });

    if (!this.common.user) {
      this.common.setProfile();
      this.subscription = this.common.emitter.subscribe((x) => {
        this.loadMoment();
      });
    } else {
      this.loadMoment();
    }
  }

  onFileSelected(event: any) {
    const file: File = event?.target?.files[0];

    if (file) {
      this.file = file;

      this.fileName = file.name;
      //
      //

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
  }

  submit() {
    if (this.form.valid && this.file) {
      let body = this.form.value;
      body['tags'] = JSON.stringify(this.tags);

      const formData = new FormData();
      formData.append('image', this.file);
      for (let key in body) {
        formData.append(key, body[key]);
      }
      this.common.openSpinner();

      if (this.momentId) {
        this.subscription1 = this.http
          .updateMoment(this.momentId, formData)
          .subscribe((x: any) => {
            this.toast.showMessage('Updated Successfully', 0);
            this.common.closeSpinner();

            this.router.navigate(['/momentList']);
          });
      } else {
        this.subscription1 = this.http
          .createMoment(formData)
          .subscribe((x: any) => {
            this.toast.showMessage('Moment Created  Successfully', 1);
            this.common.closeSpinner();

            this.router.navigate(['/momentList']);
          });
      }

      console.log(formData.getAll(''));
    } else {
      if (!this.file) this.toast.showMessage('Upload a image file', 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  loadMoment() {
    const momentId = this.route.snapshot.params['id'];

    if (momentId) {
      this.momentId = momentId;
      this.isEdit = true;
      this.http.getMoment(momentId).subscribe((x: any) => {
        console.log(x);
        this.tags = x.tags;
        this.fileName = x.file;
        this.form.patchValue({ title: x.title });
      });
    }
  }
}
