import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCastMemberComponent } from './add-edit-cast-member.component';

describe('AddEditCastMemberComponent', () => {
  let component: AddEditCastMemberComponent;
  let fixture: ComponentFixture<AddEditCastMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditCastMemberComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCastMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
