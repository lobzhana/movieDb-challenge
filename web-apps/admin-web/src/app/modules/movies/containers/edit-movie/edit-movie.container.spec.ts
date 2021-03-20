import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieContainerComponent } from './edit-movie.container';

describe('EditMovie.ContainerComponent', () => {
  let component: EditMovieContainerComponent;
  let fixture: ComponentFixture<EditMovieContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMovieContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
