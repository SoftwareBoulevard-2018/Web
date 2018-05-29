import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAttemptsComponent } from './trainingAttempts.component';

describe('TrainingAttemptsComponent', () => {
  let component: TrainingAttemptsComponent;
  let fixture: ComponentFixture<TrainingAttemptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAttemptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
