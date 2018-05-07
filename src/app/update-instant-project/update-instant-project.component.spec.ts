import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstantProjectComponent } from './update-instant-project.component';

describe('UpdateInstantProjectComponent', () => {
  let component: UpdateInstantProjectComponent;
  let fixture: ComponentFixture<UpdateInstantProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInstantProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInstantProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
