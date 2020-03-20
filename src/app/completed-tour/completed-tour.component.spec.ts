import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTourComponent } from './completed-tour.component';

describe('CompletedTourComponent', () => {
  let component: CompletedTourComponent;
  let fixture: ComponentFixture<CompletedTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
