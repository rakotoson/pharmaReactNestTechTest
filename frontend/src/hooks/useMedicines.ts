import { useQuery } from '@tanstack/react-query'
import { fetchMedicines } from '../api/medicines'

export const MEDICINES_KEY = ['medicines']

export function useMedicines() {
    return useQuery({
        queryKey: MEDICINES_KEY,
        queryFn: fetchMedicines,
    })
}