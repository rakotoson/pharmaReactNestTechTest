import { useState } from 'react'
import { useMedicines, useCreateMedicine, useUpdateMedicine, useDeleteMedicine } from '../hooks/useMedicines'
import { MedicineForm } from '../components/MedicineForm'
import type { Medicine, UpdateMedicineDto, SortBy, SortOrder } from '../types/medicine'

export function MedicinesPage() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [search, setSearch] = useState('')
    const [sortBy, setSortBy] = useState<SortBy>('name')
    const [order, setOrder] = useState<SortOrder>('ASC')

    const { data, isLoading, error } = useMedicines(page, limit, search, sortBy, order)
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

    function handleSort(column: SortBy) {
        if (sortBy === column) {
            setOrder(order === 'ASC' ? 'DESC' : 'ASC')
        } else {
            setSortBy(column)
            setOrder('ASC')
        }
        setPage(1) // Reset to page 1 on sort change
    }

    const renderSortIndicator = (column: SortBy) => {
        if (sortBy !== column) {
            return <span style={{ opacity: 0.3, marginLeft: 4 }}>↕</span>
        }
        return <span style={{ marginLeft: 4 }}>{order === 'ASC' ? '↑' : '↓'}</span>
    }

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

            <div style={{ marginTop: '24px', marginBottom: '16px' }}>
                <input
                    className="form-input"
                    style={{ maxWidth: '300px' }}
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(1)
                    }}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('name')}>
                            Name{renderSortIndicator('name')}
                        </th>
                        <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('price')}>
                            Price (€){renderSortIndicator('price')}
                        </th>
                        <th style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => handleSort('stock')}>
                            Stock{renderSortIndicator('stock')}
                        </th>
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
