import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMedicines, createMedicine, updateMedicine, deleteMedicine } from '../api/medicines'
import type { CreateMedicineDto, UpdateMedicineDto, SortBy, SortOrder } from '../types/medicine'

export const MEDICINES_KEY = ['medicines']

export function useMedicines(
    page: number = 1,
    limit: number = 5,
    search: string = '',
    sortBy: SortBy = 'name',
    order: SortOrder = 'ASC'
) {
    return useQuery({
        queryKey: [...MEDICINES_KEY, page, limit, search, sortBy, order],
        queryFn: () => fetchMedicines(page, limit, search, sortBy, order),
        placeholderData: (prev) => prev,
    })
}

export function useCreateMedicine() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateMedicineDto) => createMedicine(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: MEDICINES_KEY }),
    })
}

export function useUpdateMedicine() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateMedicineDto }) =>
            updateMedicine(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: MEDICINES_KEY }),
    })
}

export function useDeleteMedicine() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteMedicine(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: MEDICINES_KEY }),
    })
}