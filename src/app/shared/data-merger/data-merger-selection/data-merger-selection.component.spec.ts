import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMergerSelectionComponent } from './data-merger-selection.component';

describe('DataMergerSelectionComponent', () => {
  let component: DataMergerSelectionComponent;
  let fixture: ComponentFixture<DataMergerSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataMergerSelectionComponent]
    });
    fixture = TestBed.createComponent(DataMergerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
