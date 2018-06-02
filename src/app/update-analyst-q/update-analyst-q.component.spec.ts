import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnalystQComponent } from './update-analyst-q.component';

describe('UpdateAnalystQComponent', () => {
  let component: UpdateAnalystQComponent;
  let fixture: ComponentFixture<UpdateAnalystQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAnalystQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAnalystQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
