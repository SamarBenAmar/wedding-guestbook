import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreDor } from './livre-dor';

describe('LivreDor', () => {
  let component: LivreDor;
  let fixture: ComponentFixture<LivreDor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreDor],
    }).compileComponents();

    fixture = TestBed.createComponent(LivreDor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
