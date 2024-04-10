'use server';

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import type { Provider } from '../../../../utils/providerType';
import { connectDB } from '../../../../utils/db';
import { ProviderModel } from '../../../../models/Provider';
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function GET( request: Request, { params }: { params: { providerId: string } } ) {
    
    const providerId = params.providerId;

    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    await connectDB();

    const provider = await ProviderModel.findById(providerId);
    if (!provider) return NextResponse.json({ message: 'Provider not found', success: false, status: 404 })

    return NextResponse.json({ provider, success: true, status: 200 })
}

export async function PUT( request: Request, { params }: { params: { providerId: string } } ) {

    const providerId = params.providerId;

    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });
            
    const { name, bio, website, zipcode, phone, email, tags, hidden } = await request.json();
        
    await connectDB();

    const provider = await ProviderModel.findByIdAndUpdate(providerId, {
        name,
        bio,
        website,
        zipcode,
        phone,
        email,
        tags,
        hidden
    }, { new: true });
    
    if (!provider) return NextResponse.json({ message: 'Provider not found', success: false, status: 404 })

    console.log(`Provider ${provider.name} updated`)
    return NextResponse.json({ message: `Provider ${provider.name} updated`, success: true, status: 200 })
}

export async function DELETE( request: Request, { params }: { params: { providerId: string } } ) {

    const providerId = params.providerId;

    const { userId } = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    
    await connectDB();

    const provider = await ProviderModel.findByIdAndDelete(providerId);
    if (!provider) return NextResponse.json({ message: 'Provider not found', success: false, status: 404 })

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    
    if (!accessKeyId || !secretAccessKey) {
        return NextResponse.json({ message: 'AWS credentials not found', success: false, status: 500 })
    }

    const s3Client = new S3Client({ 
        region: 'us-east-2', 
        credentials: { 
            accessKeyId, 
            secretAccessKey 
        } 
    });

    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: "rcimhdatabase",
            Key: provider.imageURL.split('https://rcimhdatabase.s3.us-east-2.amazonaws.com/')[1].replace('+', ' ')
        })
    )

    console.log(`Provider ${provider.name} deleted`)
    return NextResponse.json({ message: `Provider ${provider.name} deleted`, success: true, status: 200 })
}