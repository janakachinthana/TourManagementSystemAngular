import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedFormComponent } from './completed-form.component';

describe('CompletedFormComponent', () => {
  let component: CompletedFormComponent;
  let fixture: ComponentFixture<CompletedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
