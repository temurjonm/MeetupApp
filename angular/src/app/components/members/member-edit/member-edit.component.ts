import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { Observable } from 'rxjs';
import { IMember } from '../../../models/members.model';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [AsyncPipe, NgIf, TabsModule, DatePipe, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm?: NgForm;
  private _accountService = inject(AccountService);
  private _memberService = inject(MemberService);
  private _toastr = inject(ToastrService);

  member$!: Observable<IMember>;

  ngOnInit(): void {
    const user = this._accountService.currentUser();
    if (!user) return;
    this.member$ = this._memberService.getMember(user.username);
  }

  updateMember() {
    this._toastr.success("Profile updated successfully!");
    this.editForm?.reset();
  }

}
