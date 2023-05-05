import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasColumnsAssignmentsComponent } from './canvas-columns-assignments.component';

describe('CanvasColumnsAssignmentsComponent', () => {
  let component: CanvasColumnsAssignmentsComponent;
  let fixture: ComponentFixture<CanvasColumnsAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CanvasColumnsAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasColumnsAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
