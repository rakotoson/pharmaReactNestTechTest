import type { Medicine, CreateMedicineDto, UpdateMedicineDto, PaginatedResponse } from '../types/medicine'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(err.message ?? 'Request failed')
    }
    return res.json()
}

export async function fetchMedicines(page = 1, limit = 5): Promise<PaginatedResponse<Medicine>> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) })
    const res = await fetch(`${API_URL}/medicines?${params}`)
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(err.message ?? 'Request failed')
    }
    return res.json()
}

export async function createMedicine(
    data: CreateMedicineDto,
): Promise<Medicine> {
    const res = await fetch(`${API_URL}/medicines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Failed to create medicine')
    return res.json()
}
export async function updateMedicine(id: number, data: UpdateMedicineDto): Promise<Medicine> {
    const res = await fetch(`${API_URL}/medicines/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update medicine')
    return res.json()
}
export async function deleteMedicine(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/medicines/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete medicine')
}
