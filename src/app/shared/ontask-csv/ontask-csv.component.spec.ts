import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntaskCsvComponent } from './ontask-csv.component';

describe('OntaskCsvComponent', () => {
  let component: OntaskCsvComponent;
  let fixture: ComponentFixture<OntaskCsvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OntaskCsvComponent]
    });
    fixture = TestBed.createComponent(OntaskCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
