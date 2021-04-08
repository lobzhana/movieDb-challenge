import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMovieContainerComponent } from './add-new-movie.container';

describe('AddNewMovieComponent', () => {
  let component: AddNewMovieContainerComponent;
  let fixture: ComponentFixture<AddNewMovieContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewMovieContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMovieContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
