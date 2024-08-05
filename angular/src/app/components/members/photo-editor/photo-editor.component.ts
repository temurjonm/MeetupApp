import { Component, inject, input, OnInit, output } from '@angular/core';
import { IMember } from '../../../models/members.model';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { AccountService } from '../../../services/account.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgStyle, FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.scss'
})
export class PhotoEditorComponent implements OnInit {
  private accountService = inject(AccountService);
  uploader?: FileUploader;
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

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        const updateMember = { ...this.member() };
        updateMember.photos.push(photo);
        this.memberChange.emit(updateMember);
      }
    };
  }
}
