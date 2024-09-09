import { HttpParams, HttpResponse } from "@angular/common/http";
import { signal } from "@angular/core";
import { PaginatedResult } from "../models/pagination.model";

export function setPaginatedResponse<T>(
    response: HttpResponse<T>,
    paginatedResultSignal: ReturnType<typeof signal<PaginatedResult<T> | null>>
) {
    const paginationHeader = response.headers.get('Pagination');
    if (paginationHeader) {
      const pagination = JSON.parse(paginationHeader);
      paginatedResultSignal.set({
        items: response.body as T,
        pagination
      });
    } else {
      paginatedResultSignal.set({
        items: response.body as T,
        pagination: undefined
      });
    }
  }
  
  export function setPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
    let params = new HttpParams();
  
    if (pageNumber > 0) {
      params = params.append('pageNumber', pageNumber.toString());
    }
  
    if (pageSize > 0) {
      params = params.append('pageSize', pageSize.toString());
    }
  
    return params;
  }