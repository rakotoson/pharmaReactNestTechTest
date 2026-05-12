import { useMedicines, useCreateMedicine } from '../hooks/useMedicines'
import { MedicineForm } from '../components/MedicineForm'

export function MedicinesPage() {
    const { data, isLoading, error } = useMedicines()
    const createMutation = useCreateMedicine()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading medicines</p>

    return (
        <div>
            <MedicineForm onSubmit={createMutation.mutate} />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price (€)</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((m) => (
                        <tr key={m.id}>
                            <td>{m.id}</td>
                            <td>{m.name}</td>
                            <td>{m.price.toFixed(2)}</td>
                            <td>{m.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
