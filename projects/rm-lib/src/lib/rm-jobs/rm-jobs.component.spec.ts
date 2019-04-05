import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmJobsComponent } from './rm-jobs.component';

describe('RmJobsComponent', () => {
  let component: RmJobsComponent;
  let fixture: ComponentFixture<RmJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
