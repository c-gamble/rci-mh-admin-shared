'use server';

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import type { Provider } from '../../../utils/providerType';
import { connectDB } from '../../../utils/db';
import { ProviderModel } from '../../../models/Provider';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST( request: Request ) {

    const {userId} = auth();
    if (!userId) return new Response("Unauthorized", { status: 401 });

    const req = await request.json();
    const unprocessedProviderData = req.provider;

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

    const fileName = `${unprocessedProviderData.name}_logo.${req.fileType.split('/')[1]}`.replace(' ', '_').toLowerCase();
    await s3Client.send(
        new PutObjectCommand({
            Bucket: 'rcimhdatabase',
            ACL: 'public-read',
            Key: fileName,
            Body: Buffer.from(unprocessedProviderData.image.replace(/^data:image\/\w+;base64,/, ""), "base64"),
            ContentType: req.fileType
        })
      );

    const providerData = {
        name: unprocessedProviderData.name,
        imageURL: `https://rcimhdatabase.s3.us-east-2.amazonaws.com/${fileName}`,
        bio: unprocessedProviderData.bio,
        website: unprocessedProviderData.website,
        zipcode: unprocessedProviderData.zipcode,
        phone: unprocessedProviderData.phone,
        email: unprocessedProviderData.email,
        tags: unprocessedProviderData.tags,
        hidden: unprocessedProviderData.hidden
    }

    await connectDB();

    try {
        const provider = await ProviderModel.create(providerData);
        console.log(`Provider ${provider.name} created`)
        return NextResponse.json({ message: `Provider ${provider.name} created`, success: true, status: 200 })
    } catch (err: any) {
        console.log(err);
        
        if (err.code === 11000) {
            return NextResponse.json({ message: 'Provider already exists', success: false, status: 409 })
        }
        return NextResponse.json({ message: err.message, success: false, status: 500 })
    }
}