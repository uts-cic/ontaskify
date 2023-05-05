import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasCoursesComponent } from './canvas-courses.component';

describe('CanvasCoursesComponent', () => {
  let component: CanvasCoursesComponent;
  let fixture: ComponentFixture<CanvasCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CanvasCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
