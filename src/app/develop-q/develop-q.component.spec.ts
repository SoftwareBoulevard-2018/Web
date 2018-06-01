import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopQComponent } from './develop-q.component';

describe('DevelopQComponent', () => {
  let component: DevelopQComponent;
  let fixture: ComponentFixture<DevelopQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
