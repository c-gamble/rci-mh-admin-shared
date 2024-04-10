'use server';

import { NextResponse } from 'next/server';
import type { Provider } from '../../../utils/providerType';
import { connectDB } from '../../../utils/db';
import { auth } from '@clerk/nextjs';
import { ProviderModel } from '../../../models/Provider';

export async function GET() {

    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await connectDB();

    const providers: any[] = await ProviderModel.find({});
    const returnProviders: Provider[] = providers.map(provider => {
        const { _id, name, imageURL, bio, website, zipcode, phone, email, tags, hidden, selected } = provider;
        return { _id, name, imageURL, bio, website, zipcode, phone, email, tags, hidden, selected };
    });

    return NextResponse.json({ providers: returnProviders, status: 200 });
}