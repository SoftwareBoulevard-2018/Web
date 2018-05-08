import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateresourcesComponent } from './generateresources.component';

describe('GenerateresourcesComponent', () => {
  let component: GenerateresourcesComponent;
  let fixture: ComponentFixture<GenerateresourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateresourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
