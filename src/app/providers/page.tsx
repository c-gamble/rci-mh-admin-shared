'use client';

import { useState, useEffect } from 'react';
import { Provider } from '../../utils/providerType';
import ProviderTable from '../../components/providerTable';

export default function Providers() {

    const [providers, setProviders] = useState<Provider[]>([]);

    useEffect(() => {
        
        const fetchProviders = async () => {
            const res = await fetch('/api/providers');
            const data = await res.json();
            const fetchedProviders: Provider[] = data.providers;
            const filteredProviders: Provider[] = fetchedProviders.filter(provider => provider.hidden == false);
            setProviders(filteredProviders);
        }

        fetchProviders();

    }, [])

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <ProviderTable providers={providers} />
        </div>
    )
}