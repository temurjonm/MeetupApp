import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { IMember } from '../../../models/members.model';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {GalleryItem, GalleryModule, ImageItem} from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf, DatePipe, TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit {

  private _memberService = inject(MemberService);
  private _route = inject(ActivatedRoute);
  member$!: Observable<IMember>;
  images: GalleryItem[] = []

  ngOnInit(): void {
    const username = this._route.snapshot.params["id"];
    if (!username) return;
    this.member$ = this._memberService.getMember(username)
      .pipe(
        map(member => {
          member.photos.map(p => {
            this.images.push(new ImageItem({ src: p.url, thumb: p.url }))
          })
          return member;
        })
      );
  }

}
