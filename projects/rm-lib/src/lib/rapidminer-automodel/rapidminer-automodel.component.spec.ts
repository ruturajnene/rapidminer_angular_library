import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapidminerAutomodelComponent } from './rapidminer-automodel.component';

describe('RapidminerAutomodelComponent', () => {
  let component: RapidminerAutomodelComponent;
  let fixture: ComponentFixture<RapidminerAutomodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapidminerAutomodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapidminerAutomodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
