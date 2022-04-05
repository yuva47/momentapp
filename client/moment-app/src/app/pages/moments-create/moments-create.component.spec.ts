import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentsCreateComponent } from './moments-create.component';

describe('MomentsCreateComponent', () => {
  let component: MomentsCreateComponent;
  let fixture: ComponentFixture<MomentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
