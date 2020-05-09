import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WellcomPageComponent } from './wellcom-page.component';

describe('WellcomPageComponent', () => {
  let component: WellcomPageComponent;
  let fixture: ComponentFixture<WellcomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WellcomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WellcomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
