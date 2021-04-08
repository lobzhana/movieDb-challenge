import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMembersListComponent } from './cast-members-list.component';

describe('CastMembersListComponent', () => {
  let component: CastMembersListComponent;
  let fixture: ComponentFixture<CastMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastMembersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
