import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStatusComponent } from './company-status.component';

describe('CompanyStatusComponent', () => {
  let component: CompanyStatusComponent;
  let fixture: ComponentFixture<CompanyStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
