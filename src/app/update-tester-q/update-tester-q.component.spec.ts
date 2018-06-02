import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTesterQComponent } from './update-tester-q.component';

describe('UpdateTesterQComponent', () => {
  let component: UpdateTesterQComponent;
  let fixture: ComponentFixture<UpdateTesterQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTesterQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTesterQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
