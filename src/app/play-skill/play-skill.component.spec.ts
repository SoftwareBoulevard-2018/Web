import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySkillComponent } from './play-skill.component';

describe('PlaySkillComponent', () => {
  let component: PlaySkillComponent;
  let fixture: ComponentFixture<PlaySkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaySkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
