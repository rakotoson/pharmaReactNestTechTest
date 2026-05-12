import { useState } from 'react'
import { useMedicines, useCreateMedicine, useUpdateMedicine, useDeleteMedicine } from '../hooks/useMedicines'
import { MedicineForm } from '../components/MedicineForm'
import type { Medicine, UpdateMedicineDto } from '../types/medicine'

export function MedicinesPage() {
    const { data, isLoading, error } = useMedicines()
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
                    {data?.map((m) => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.name}</td>
                            <td>{m.price.toFixed(2)}</td>
                            <td>{m.stock}</td>
                            <td>
                                <button onClick={() => setEditingMedicine(m)}>Edit</button>
                                <button
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
        </div>
    )
}
