import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentsListComponent } from './moments-list.component';

describe('MomentsListComponent', () => {
  let component: MomentsListComponent;
  let fixture: ComponentFixture<MomentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
