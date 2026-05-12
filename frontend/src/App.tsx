import { useState } from 'react'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'
import { ToastProvider, useToast } from './contexts/ToastContext'
import './App.css'
import { MedicinesPage } from "./pages/MedicinesPage.tsx";

function AppContent() {
    const { showError } = useToast()

    const [queryClient] = useState(() => new QueryClient({
        queryCache: new QueryCache({
            onError: (error) => showError(error.message || 'Une erreur est survenue')
        }),
        mutationCache: new MutationCache({
            onError: (error) => showError(error.message || 'L\'action a échoué')
        }),
        defaultOptions: {
            queries: {
                retry: false, // Don't retry, show error toast immediately
                refetchOnWindowFocus: false,
            }
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <div style={{ padding: 24 }}>
                <h1>Pharmacy – Medicines</h1>
                <MedicinesPage />
            </div>
        </QueryClientProvider>
    )
}

function App() {
    return (
        <ToastProvider>
            <AppContent />
        </ToastProvider>
    )
}

export default App
