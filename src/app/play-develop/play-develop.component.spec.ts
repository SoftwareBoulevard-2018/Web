import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDevelopComponent } from './play-develop.component';

describe('PlayDevelopComponent', () => {
  let component: PlayDevelopComponent;
  let fixture: ComponentFixture<PlayDevelopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayDevelopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDevelopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
