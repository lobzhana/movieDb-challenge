import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCastMemberDialogContainerComponent } from './add-edit-cast-member-dialog.container';

describe('AddNewCastMemberDialogComponent', () => {
  let component: AddEditCastMemberDialogContainerComponent;
  let fixture: ComponentFixture<AddEditCastMemberDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCastMemberDialogContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCastMemberDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
