import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmLibComponent } from './rm-lib.component';

describe('RmLibComponent', () => {
  let component: RmLibComponent;
  let fixture: ComponentFixture<RmLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
