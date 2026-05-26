import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Souvenir } from './souvenir';

describe('Souvenir', () => {
  let component: Souvenir;
  let fixture: ComponentFixture<Souvenir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Souvenir],
    }).compileComponents();

    fixture = TestBed.createComponent(Souvenir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
