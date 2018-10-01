import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeveloperQComponent } from './update-developer-q.component';

describe('UpdateDeveloperQComponent', () => {
  let component: UpdateDeveloperQComponent;
  let fixture: ComponentFixture<UpdateDeveloperQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDeveloperQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeveloperQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
