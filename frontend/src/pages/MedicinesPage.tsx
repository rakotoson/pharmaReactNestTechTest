import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMedicines } from '../hooks/useMedicines'
import { createMedicine } from '../api/medicines'
import { MedicineForm } from '../components/MedicineForm'

export function MedicinesPage() {
    const queryClient = useQueryClient()
    const { data, isLoading, error } = useMedicines()

    const mutation = useMutation({
        mutationFn: createMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] })
        },
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading medicines</p>

    return (
        <div>
            <MedicineForm onSubmit={mutation.mutate} />

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
