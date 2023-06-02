import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMergerDialogComponent } from './data-merger-dialog.component';

describe('DataMergerDialogComponent', () => {
  let component: DataMergerDialogComponent;
  let fixture: ComponentFixture<DataMergerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataMergerDialogComponent]
    });
    fixture = TestBed.createComponent(DataMergerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
