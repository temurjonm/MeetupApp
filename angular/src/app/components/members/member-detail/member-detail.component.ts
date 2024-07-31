import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { IMember } from '../../../models/members.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit {

  private _memberService = inject(MemberService);
  private _route = inject(ActivatedRoute);
  member$!: Observable<IMember>;

  ngOnInit(): void {
    const username = this._route.snapshot.paramMap.get('username');
    console.log(username)
    if (!username) return;
    this.member$ = this._memberService.getMember(username);
  }

}
