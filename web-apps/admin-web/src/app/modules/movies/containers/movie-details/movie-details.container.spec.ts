import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsContainerComponent } from './movie-details.container';

describe('DetailsComponent', () => {
  let component: DetailsContainerComponent;
  let fixture: ComponentFixture<DetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
