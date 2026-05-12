import { useState } from 'react'
import type { CreateMedicineDto } from '../types/medicine'

interface Props {
    onSubmit: (data: CreateMedicineDto) => void
}

interface FormErrors {
    name?: string
    price?: string
    stock?: string
}

export function MedicineForm({ onSubmit }: Props) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [errors, setErrors] = useState<FormErrors>({})

    function validate(): FormErrors {
        const e: FormErrors = {}
        if (!name.trim()) e.name = 'Name is required'
        if (price <= 0) e.price = 'Price must be greater than 0'
        if (stock < 0) e.stock = 'Stock must be 0 or more'
        return e
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        onSubmit({ name, price, stock })
        setName('')
        setPrice(0)
        setStock(0)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add medicine</h3>

            <div>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.name}</p>}
            </div>

            <div>
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                {errors.price && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.price}</p>}
            </div>

            <div>
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                />
                {errors.stock && <p style={{ color: 'red', fontSize: '0.8rem' }}>{errors.stock}</p>}
            </div>

            <button type="submit">Add</button>
        </form>
    )
}
