import type { Medicine, CreateMedicineDto, UpdateMedicineDto } from '../types/medicine'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(err.message ?? 'Request failed')
    }
    return res.json()
}

export async function fetchMedicines(): Promise<Medicine[]> {
    const res = await fetch(`${API_URL}/medicines`)

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(err.message ?? 'Request failed')
    }
    
    const medecines = await handleResponse<{ data: Medicine[] } | Medicine[]>(res)
    
    return Array.isArray(medecines) ? medecines : medecines.data
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
