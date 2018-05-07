import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBiddingProjectComponent } from './update-bidding-project.component';

describe('UpdateBiddingProjectComponent', () => {
  let component: UpdateBiddingProjectComponent;
  let fixture: ComponentFixture<UpdateBiddingProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBiddingProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBiddingProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
