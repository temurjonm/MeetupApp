import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { map, Observable } from 'rxjs';
import { IMember } from '../../../models/members.model';
import { AsyncPipe, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [AsyncPipe, NgIf, TabsModule, DatePipe, FormsModule, JsonPipe, PhotoEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm;
  member!: IMember;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  private _accountService = inject(AccountService);
  private _memberService = inject(MemberService);
  private _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    const user = this._accountService.currentUser();
    if (!user) return;
    this._memberService.getMember(user.username).subscribe((member) => (this.member = member));
  }

  updateMember(): void {
    if (!this.editForm) return;
    this._memberService.updateMember(this.editForm.value).subscribe({
      next: () => {
        this._toastr.success('Profile updated successfully!');
        this.editForm.reset(this.member);
      },
      error: (err) => {
        console.error(err);
        this._toastr.error('Failed to update profile. Please try again.');
      }
    });
  }

  onMemberChange(member: IMember): void {
    this.member = member;
  }
}