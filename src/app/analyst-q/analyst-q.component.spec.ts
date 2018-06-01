import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystQComponent } from './analyst-q.component';

describe('AnalystQComponent', () => {
  let component: AnalystQComponent;
  let fixture: ComponentFixture<AnalystQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalystQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalystQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
