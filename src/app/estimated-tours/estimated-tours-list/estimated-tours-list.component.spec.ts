import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedToursListComponent } from './estimated-tours-list.component';

describe('EstimatedToursListComponent', () => {
  let component: EstimatedToursListComponent;
  let fixture: ComponentFixture<EstimatedToursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatedToursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedToursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
