import { useState } from 'react'
import { useMedicines, useCreateMedicine, useUpdateMedicine, useDeleteMedicine } from '../hooks/useMedicines'
import { MedicineForm } from '../components/MedicineForm'
import type { Medicine, UpdateMedicineDto } from '../types/medicine'

export function MedicinesPage() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)

    const { data, isLoading, error } = useMedicines(page, limit)
    const createMutation = useCreateMedicine()
    const updateMutation = useUpdateMedicine()
    const deleteMutation = useDeleteMedicine()

    const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null)

    function handleUpdate(data: UpdateMedicineDto) {
        if (!editingMedicine) return
        updateMutation.mutate(
            { id: editingMedicine.id, data },
            { onSuccess: () => setEditingMedicine(null) }
        )
    }

    function handleDelete(medicine: Medicine) {
        if (!window.confirm(`Delete "${medicine.name}"?`)) return
        deleteMutation.mutate(medicine.id)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading medicines</p>

    const totalPages = data?.totalPages ?? 1

    return (
        <div>
            {editingMedicine ? (
                <MedicineForm
                    initialValues={editingMedicine}
                    submitLabel="Save"
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingMedicine(null)}
                />
            ) : (
                <MedicineForm onSubmit={createMutation.mutate} />
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price (€)</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.map((m) => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.name}</td>
                            <td>{m.price.toFixed(2)}</td>
                            <td>{m.stock}</td>
                            <td>
                                <button className="btn-edit" onClick={() => setEditingMedicine(m)}>Edit</button>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(m)}
                                    disabled={deleteMutation.isPending}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    className="btn-page"
                    onClick={() => setPage((p) => p - 1)}
                    disabled={page === 1}
                >
                    ← Prev
                </button>
                <span className="page-info">Page {page} / {totalPages}</span>
                <button
                    className="btn-page"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages}
                >
                    Next →
                </button>
                <select
                    className="per-page-select"
                    value={limit}
                    onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }}
                >
                    {[5, 10, 20].map((n) => (
                        <option key={n} value={n}>{n} / page</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
