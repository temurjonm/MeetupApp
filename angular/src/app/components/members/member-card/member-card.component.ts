import { Component, input } from '@angular/core';
import { IMember } from '../../../models/members.model';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {
  member = input.required<IMember>();
}
