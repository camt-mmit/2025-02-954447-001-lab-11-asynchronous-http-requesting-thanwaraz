import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsViewPage } from './films-view-page';

describe('FilmsViewPage', () => {
  let component: FilmsViewPage;
  let fixture: ComponentFixture<FilmsViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsViewPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
