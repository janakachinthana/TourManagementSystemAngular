import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedFormComponent } from './confirmed-form.component';

describe('ConfirmedFormComponent', () => {
  let component: ConfirmedFormComponent;
  let fixture: ComponentFixture<ConfirmedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
