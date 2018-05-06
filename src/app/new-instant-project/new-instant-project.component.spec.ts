import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstantProjectComponent } from './new-instant-project.component';

describe('NewInstantProjectComponent', () => {
  let component: NewInstantProjectComponent;
  let fixture: ComponentFixture<NewInstantProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInstantProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstantProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
