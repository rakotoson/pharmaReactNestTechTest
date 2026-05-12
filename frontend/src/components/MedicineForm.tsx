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
        } else {
            setName('')
            setPrice(0)
            setStock(0)
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
        <form className="medicine-form" onSubmit={handleSubmit}>
            <h3 className="form-title">{initialValues ? 'Edit medicine' : 'Add medicine'}</h3>

            <div className="form-row">
                <div className="form-field">
                    <label className="form-label">Name</label>
                    <input
                        className={`form-input${errors.name ? ' form-input--error' : ''}`}
                        placeholder="e.g. Paracétamol"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-field">
                    <label className="form-label">Price (€)</label>
                    <input
                        className={`form-input${errors.price ? ' form-input--error' : ''}`}
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                    {errors.price && <span className="form-error">{errors.price}</span>}
                </div>

                <div className="form-field">
                    <label className="form-label">Stock</label>
                    <input
                        className={`form-input${errors.stock ? ' form-input--error' : ''}`}
                        type="number"
                        min="0"
                        placeholder="0"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                    />
                    {errors.stock && <span className="form-error">{errors.stock}</span>}
                </div>

                <div className="form-actions">
                    <button className="btn-submit" type="submit">{submitLabel}</button>
                    {onCancel && <button className="btn-cancel" type="button" onClick={onCancel}>Cancel</button>}
                </div>
            </div>
        </form>
    )
}
