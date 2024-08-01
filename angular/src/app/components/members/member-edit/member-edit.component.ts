import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
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
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild("editForm") editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  private _accountService = inject(AccountService);
  private _memberService = inject(MemberService);
  private _toastr = inject(ToastrService);

  member$!: Observable<IMember>;

  ngOnInit(): void {
    this.reloadMemberData();
  }

  reloadMemberData() {
    const user = this._accountService.currentUser();
    if (!user) return;
    this.member$ = this._memberService.getMember(user.username);
  }

  updateMember() {
    if (!this.editForm) return;
    const updatedMember = this.editForm.value;

    this._memberService.updateMember(updatedMember).subscribe({
      next: _ => {
        this._toastr.success("Profile updated successfully!");
        this.editForm?.reset(updatedMember);
        this.reloadMemberData();
      },
      error: err => {
        console.error(err);
        this._toastr.error("Failed to update profile. Please try again.");
      }
    });
  }
}
