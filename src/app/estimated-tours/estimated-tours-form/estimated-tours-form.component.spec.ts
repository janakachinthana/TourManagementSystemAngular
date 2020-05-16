import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedToursFormComponent } from './estimated-tours-form.component';

describe('EstimatedToursFormComponent', () => {
  let component: EstimatedToursFormComponent;
  let fixture: ComponentFixture<EstimatedToursFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedToursFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedToursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
