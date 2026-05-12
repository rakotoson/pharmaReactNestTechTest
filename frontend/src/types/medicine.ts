export interface Medicine {
    id: number
    name: string
    price: number
    stock: number
}

export type CreateMedicineDto = Omit<Medicine, 'id'>
export type UpdateMedicineDto = Pick<Medicine, 'name' | 'price' | 'stock'>

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}
