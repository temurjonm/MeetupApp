import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { Observable } from 'rxjs';
import { IMember } from '../../../models/members.model';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [AsyncPipe, NgIf, TabsModule, DatePipe],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  private _accountService = inject(AccountService);
  private _memberService = inject(MemberService);
  member$!: Observable<IMember>;

  ngOnInit(): void {
    const user = this._accountService.currentUser();
    if (!user) return;
    this.member$ = this._memberService.getMember(user.username);
  }

}
