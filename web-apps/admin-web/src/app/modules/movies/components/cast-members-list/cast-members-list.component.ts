import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CastMemberModel } from 'src/app/core/movies/models/cast-member.model';

@Component({
  selector: 'app-cast-members-list',
  templateUrl: './cast-members-list.component.html',
  styleUrls: ['./cast-members-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CastMembersListComponent implements OnInit {
  @Input() castMembers: CastMemberModel[];
  @Output() edit = new EventEmitter<CastMemberModel>();
  @Output() remove = new EventEmitter<CastMemberModel>();

  constructor() {}

  ngOnInit(): void {}
}
