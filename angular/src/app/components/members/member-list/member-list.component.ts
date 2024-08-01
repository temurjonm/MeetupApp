import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
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
  
  memberService = inject(MemberService);

  ngOnInit(): void {
    if (this.memberService.members().length === 0) {
      this.loadMembers();
    }
  }

  loadMembers() {
    this.memberService.getMembers();
  }

}
