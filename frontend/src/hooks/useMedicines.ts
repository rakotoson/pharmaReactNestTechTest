import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMedicines, createMedicine } from '../api/medicines'
import type { CreateMedicineDto } from '../types/medicine'

export const MEDICINES_KEY = ['medicines']

export function useMedicines() {
    return useQuery({
        queryKey: MEDICINES_KEY,
        queryFn: fetchMedicines,
    })
}

export function useCreateMedicine() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CreateMedicineDto) => createMedicine(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: MEDICINES_KEY }),
    })
}