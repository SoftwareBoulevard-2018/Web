import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterQComponent } from './tester-q.component';

describe('TesterQComponent', () => {
  let component: TesterQComponent;
  let fixture: ComponentFixture<TesterQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
