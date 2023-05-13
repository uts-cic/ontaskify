import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasColumnsProgressComponent } from './canvas-columns-progress.component';

describe('CanvasColumnsProgressComponent', () => {
  let component: CanvasColumnsProgressComponent;
  let fixture: ComponentFixture<CanvasColumnsProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanvasColumnsProgressComponent]
    });
    fixture = TestBed.createComponent(CanvasColumnsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
