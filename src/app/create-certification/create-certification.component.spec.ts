import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCertificationComponent } from './create-certification.component';

describe('CreateCertificationComponent', () => {
  let component: CreateCertificationComponent;
  let fixture: ComponentFixture<CreateCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
