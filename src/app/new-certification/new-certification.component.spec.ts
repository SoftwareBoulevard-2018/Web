import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCertificationComponent } from './new-certification.component';

describe('NewCertificationComponent', () => {
  let component: NewCertificationComponent;
  let fixture: ComponentFixture<NewCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
