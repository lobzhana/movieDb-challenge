import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCastMemberToMovieComponent } from './add-cast-member-to-movie.component';

describe('AddCastMemberToMovieComponent', () => {
  let component: AddCastMemberToMovieComponent;
  let fixture: ComponentFixture<AddCastMemberToMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCastMemberToMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCastMemberToMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
