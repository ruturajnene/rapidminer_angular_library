import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWeightsTableComponent } from './data-weights-table.component';

describe('DataWeightsTableComponent', () => {
  let component: DataWeightsTableComponent;
  let fixture: ComponentFixture<DataWeightsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataWeightsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataWeightsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
