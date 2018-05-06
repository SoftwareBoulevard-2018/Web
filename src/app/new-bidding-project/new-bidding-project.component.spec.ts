import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBiddingProjectComponent } from './new-bidding-project.component';

describe('NewBiddingProjectComponent', () => {
  let component: NewBiddingProjectComponent;
  let fixture: ComponentFixture<NewBiddingProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBiddingProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBiddingProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
