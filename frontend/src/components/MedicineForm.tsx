import { useState, useEffect } from 'react'
import type { CreateMedicineDto, UpdateMedicineDto } from '../types/medicine'

interface Props {
    onSubmit: (data: CreateMedicineDto) => void
    initialValues?: UpdateMedicineDto
    submitLabel?: string
    onCancel?: () => void
}

interface FormErrors {
    name?: string
    price?: string
    stock?: string
}

export function MedicineForm({ onSubmit, initialValues, submitLabel = 'Add', onCancel }: Props) {
    const [name, setName] = useState(initialValues?.name ?? '')
    const [price, setPrice] = useState(initialValues?.price ?? 0)
    const [stock, setStock] = useState(initialValues?.stock ?? 0)
    const [errors, setErrors] = useState<FormErrors>({})

    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name)
            setPrice(initialValues.price)
            setStock(initialValues.stock)
            setErrors({})
        }
    }, [initialValues])

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

        if (!initialValues) {
            setName('')
            setPrice(0)
            setStock(0)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>{initialValues ? 'Edit medicine' : 'Add medicine'}</h3>

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

            <button type="submit">{submitLabel}</button>
            {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
        </form>
    )
}
