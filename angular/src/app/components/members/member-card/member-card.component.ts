import { Component, computed, inject, input } from '@angular/core';
import { IMember } from '../../../models/members.model';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../../services/likes.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {
  private likeService = inject(LikesService);
  member = input.required<IMember>();
  hasLiked = computed(() => this.likeService.likeIds().includes(this.member().id)); 

  toggleLike(): void {
    this.likeService.toggleLike(this.member().id)
      .subscribe({
        next: () => {
          if (this.hasLiked()) {
            this.likeService.likeIds.update(ids => ids.filter(id => id !== this.member().id));
          } else {
            this.likeService.likeIds.update(ids => [...ids, this.member().id]);
          }
        }
      });
  }
}
