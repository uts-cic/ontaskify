import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasColumnsQuizzesComponent } from './canvas-columns-quizzes.component';

describe('CanvasColumnsQuizzesComponent', () => {
  let component: CanvasColumnsQuizzesComponent;
  let fixture: ComponentFixture<CanvasColumnsQuizzesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanvasColumnsQuizzesComponent]
    });
    fixture = TestBed.createComponent(CanvasColumnsQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
