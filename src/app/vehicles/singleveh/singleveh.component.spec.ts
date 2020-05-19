import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglevehComponent } from './singleveh.component';

describe('SinglevehComponent', () => {
  let component: SinglevehComponent;
  let fixture: ComponentFixture<SinglevehComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglevehComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglevehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
