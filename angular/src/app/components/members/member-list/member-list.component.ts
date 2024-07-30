import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { Observable } from 'rxjs';
import { IMember } from '../../../models/members.model';
import { AsyncPipe } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [AsyncPipe, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit {
  
  private _memberService = inject(MemberService);
  members$!: Observable<IMember[]>;

  ngOnInit(): void {
    this.members$ = this._memberService.getMembers();
  }

}
