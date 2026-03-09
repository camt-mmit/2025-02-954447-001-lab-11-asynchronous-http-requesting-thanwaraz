import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsViewPage } from './planets-view-page';

describe('PlanetsViewPage', () => {
  let component: PlanetsViewPage;
  let fixture: ComponentFixture<PlanetsViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetsViewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetsViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
