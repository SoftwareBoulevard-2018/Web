import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitMemberComponent } from './recruit-member.component';

describe('RecruitMemberComponent', () => {
  let component: RecruitMemberComponent;
  let fixture: ComponentFixture<RecruitMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
