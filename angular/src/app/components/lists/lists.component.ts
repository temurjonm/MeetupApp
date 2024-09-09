import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { IMember } from '../../models/members.model';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PaginatedResult } from '../../models/pagination.model';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [FormsModule, MemberCardComponent, AsyncPipe, PaginationModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  likeService = inject(LikesService);
  members$!: Observable<PaginatedResult<IMember[]> | null>;
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadLikes();
  }

  getTitle(): string {
    switch(this.predicate) {
      case 'liked':
        return 'Members I like';
      case 'likedBy':
        return 'Members who like me';
      case 'mutual':
        return 'Mutual likes';
      default:
        return 'Members';
    }
  }

  loadLikes(): void {
    this.members$ = this.likeService.getLikes(this.predicate, this.pageNumber, this.pageSize);
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadLikes();
    }
  }
}