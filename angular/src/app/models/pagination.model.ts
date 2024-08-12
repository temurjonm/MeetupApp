export interface IPagination {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
}

export class PaginatedResult<T> {
    items?: T;
    pagination?: IPagination
}