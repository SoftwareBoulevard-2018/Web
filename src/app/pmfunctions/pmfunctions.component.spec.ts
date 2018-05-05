import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmfunctionsComponent } from './pmfunctions.component';

describe('PmfunctionsComponent', () => {
  let component: PmfunctionsComponent;
  let fixture: ComponentFixture<PmfunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmfunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmfunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
