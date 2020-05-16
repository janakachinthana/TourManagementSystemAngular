import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintguidesComponent } from './printguides.component';

describe('PrintguidesComponent', () => {
  let component: PrintguidesComponent;
  let fixture: ComponentFixture<PrintguidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintguidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintguidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
