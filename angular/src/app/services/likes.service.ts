import { Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { IMember } from '../models/members.model';
import { PaginatedResult } from '../models/pagination.model';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LikesService extends BaseService {
  likeIds = signal<number[]>([]);
  paginatedResult = signal<PaginatedResult<IMember[]> | null>(null);

  toggleLike(targetId: number) {
    return this.http.post<number>(`${this.baseUrl}likes/${targetId}`, {})
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = setPaginationHeaders(pageNumber, pageSize);
    params = params.append('predicate', predicate);

    return this.http.get<PaginatedResult<IMember[]>>(`${this.baseUrl}likes`, {
      observe: 'response',
      params
    }).pipe(
      map(response => {
        setPaginatedResponse(response, this.paginatedResult);
        return this.paginatedResult();
      })
    );
  }
  getLikeIds() {
    return this.http.get<number[]>(`${this.baseUrl}likes/list`)
      .subscribe({
        next: ids => this.likeIds.set(ids)
      } );
  }
}
