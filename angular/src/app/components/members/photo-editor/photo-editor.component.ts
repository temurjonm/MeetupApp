import { Component, inject, input, OnInit, output } from '@angular/core';
import { IMember } from '../../../models/members.model';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../../services/account.service';
import { environment } from '../../../../environments/environment';
import { MemberService } from '../../../services/member.service';
import {IPhoto} from '../../../models/photo.model';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgStyle, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss'
})
export class PhotoEditorComponent implements OnInit {
  private accountService = inject(AccountService);
  private memberService = inject(MemberService);
  uploader?: FileUploader | any;
  member = input.required<IMember>()
  memberChange = output<IMember>();
  hasBaseDropZoneOver = false;
  baseUrl = environment.baseUrl;

  ngOnInit(): void {
      this.initializeUploader();
  }

  fileOverBase($event: any) {
    this.hasBaseDropZoneOver = $event;
  }
  
  initializeUploader() {
    this.uploader = new FileUploader({ 
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file: any) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (response: string) => {
      if (response) {
        const photo = JSON.parse(response);
        const updateMember = { ...this.member() };
        updateMember.photos.push(photo);
        this.memberChange.emit(updateMember);
      }
    };
  }

  setMainPhoto(photo: IPhoto) {
    this.memberService.setMainPhoto(photo).subscribe({
      next: () => {
        const user = this.accountService.currentUser();
        if (user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }
        const updateMember = { ...this.member() };
        updateMember.photoUrl = photo.url;
        updateMember.photos.forEach(p => p.isMain = p.id === photo.id);
        this.memberChange.emit(updateMember);
      }
    })
  }

  deletePhoto(photo: IPhoto) {
    this.memberService.deletePhoto(photo).subscribe({
      next: () => {
        const user = this.accountService.currentUser();
        if (user) {
          user.photoUrl = photo.url;
          this.accountService.setCurrentUser(user);
        }
        const updateMember = { ...this.member() };
        updateMember.photos = updateMember.photos.filter(p => p.id !== photo.id);
        this.memberChange.emit(updateMember);
      }
    })
  }
}
