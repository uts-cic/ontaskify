import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasColumnsActivityComponent } from './canvas-columns-activity.component';

describe('CanvasColumnsActivityComponent', () => {
  let component: CanvasColumnsActivityComponent;
  let fixture: ComponentFixture<CanvasColumnsActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanvasColumnsActivityComponent]
    });
    fixture = TestBed.createComponent(CanvasColumnsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
