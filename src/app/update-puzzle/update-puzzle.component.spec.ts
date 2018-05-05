import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePuzzleComponent } from './update-puzzle.component';

describe('UpdatePuzzleComponent', () => {
  let component: UpdatePuzzleComponent;
  let fixture: ComponentFixture<UpdatePuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePuzzleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
