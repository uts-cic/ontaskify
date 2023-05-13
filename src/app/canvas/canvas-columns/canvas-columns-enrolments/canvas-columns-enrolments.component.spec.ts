import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasColumnsEnrolmentsComponent } from './canvas-columns-enrolments.component';

describe('CanvasColumnsEnrolmentsComponent', () => {
  let component: CanvasColumnsEnrolmentsComponent;
  let fixture: ComponentFixture<CanvasColumnsEnrolmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanvasColumnsEnrolmentsComponent]
    });
    fixture = TestBed.createComponent(CanvasColumnsEnrolmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
