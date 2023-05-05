import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTestComponent } from './canvas-test.component';

describe('CanvasTestComponent', () => {
  let component: CanvasTestComponent;
  let fixture: ComponentFixture<CanvasTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CanvasTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
