import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLearnersComponent } from './select-learners.component';

describe('SelectLearnersComponent', () => {
  let component: SelectLearnersComponent;
  let fixture: ComponentFixture<SelectLearnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLearnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
