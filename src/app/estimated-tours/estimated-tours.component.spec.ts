import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedToursComponent } from './estimated-tours.component';

describe('EstimatedToursComponent', () => {
  let component: EstimatedToursComponent;
  let fixture: ComponentFixture<EstimatedToursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedToursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
