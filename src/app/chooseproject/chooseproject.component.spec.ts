import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseprojectComponent } from './chooseproject.component';

describe('ChooseprojectComponent', () => {
  let component: ChooseprojectComponent;
  let fixture: ComponentFixture<ChooseprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
