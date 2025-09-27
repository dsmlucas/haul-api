interface PaginatedList<T> {
  data: T[]
  pagination: PaginationMeta
}

interface PaginationMeta {
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export { PaginatedList }
