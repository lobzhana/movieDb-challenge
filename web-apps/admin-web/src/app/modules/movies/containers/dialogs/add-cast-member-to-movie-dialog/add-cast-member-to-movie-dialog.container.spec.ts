import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCastMemberToMovieDialogContainerComponent } from './add-cast-member-to-movie-dialog.container';

describe('AddCastMemberToMovieDialogComponent', () => {
  let component: AddCastMemberToMovieDialogContainerComponent;
  let fixture: ComponentFixture<AddCastMemberToMovieDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCastMemberToMovieDialogContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCastMemberToMovieDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
