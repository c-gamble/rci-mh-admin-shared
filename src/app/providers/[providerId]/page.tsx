'use client';

import { useState, useEffect } from 'react';
import TagCheckbox from '@/components/tagCheckbox';


const TAGS = [
    {
        name: 'ocd',
        title: 'OCD'
    },
    {
        name: 'anxiety',
        title: 'Anxiety'
    },
    {
        name: 'addiction',
        title: 'Addiction'
    },
    {
        name: 'autism',
        title: 'Autism'
    },
    {
        name: 'bipolar',
        title: 'Bipolar'
    },
    {
        name: 'ed',
        title: 'Eating Disorder'
    },
    {
        name: 'virtual',
        title: 'Virtual'
    },
    {
        name: 'in-person',
        title: 'In Person'
    },
    {
        name: 'outpatient',
        title: 'Outpatient'
    },
    {
        name: 'inpatient',
        title: 'Inpatient'
    },
    {
        name: 'phone',
        title: 'Phone'
    },
    {
        name: 'covid',
        title: 'COVID'
    },
    {
        name: 'depression',
        title: 'Depression'
    },
    {
        name: 'crisis',
        title: 'Crisis'
    },
    {
        name: 'children',
        title: 'Children'
    },
    {
        name: 'family',
        title: 'Family'
    }
]

export default function ProviderDetails({ params }: {params: {providerId: string}}) {

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [website, setWebsite] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {

        const fetchProvider = async () => {
            const response = await fetch(`/api/providers/${params.providerId}`);
            const { provider } = await response.json();

            setName(provider.name);
            setBio(provider.bio);
            setWebsite(provider.website);
            setZipcode(provider.zipcode);
            setPhone(provider.phone);
            setEmail(provider.email);
            setTags(provider.tags);
            setHidden(provider.hidden);
        }

        fetchProvider();

    }, [params.providerId])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!name || !bio || !website || !zipcode || !phone || !email || !tags.length) {
            alert("Please fill out all fields");
            return;
        }

        const updates = {
            name,
            bio,
            website,
            zipcode,
            phone,
            email,
            tags,
            hidden
        }

        const response = await fetch(`/api/providers/${params.providerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        })

        if (response.status === 200) {
            alert("Provider successfully updated!");
            window.location.reload();
        } else {
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="w-full flex flex-col justify-start items-center">
            <div className="w-[60%] flex justify-between items-center mb-10">
                <div className="flex flex-col items-start justify-center w-[300px]">
                    <span className="text-lg font-bold mb-2">Provider Name</span>
                    <input
                        type="text"
                        placeholder="Name of provider"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 w-full h-[40px] outline-none border-2 border-gray-300 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col items-start justify-center w-[300px] opacity-50 pointer-events-none">
                    <span className="font-bold text-lg font-bold mb-2">Logo Image</span>
                    <input 
                        className="border-2 border-gray-300 h-[40px] w-full rounded-md"
                        type="file"
                        accept="image/*"
                        disabled={true}
                    />
                </div>
            </div>
            <div className="w-[60%] flex justify-center items-center mb-10">
                <div className="flex flex-col items-start justify-center w-full">
                    <span className="text-lg font-bold mb-2">Short Bio</span>
                    <textarea
                        placeholder="Describe the provider"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-2 border border-gray-300 resize-none rounded-md mb-4 w-full h-[100px] outline-none border-2 border-gray-300 focus:border-blue-500"
                    />
                </div>                
            </div>
            <div className="w-[60%] flex justify-between items-center mb-10">
                <div className="flex flex-col items-start justify-center w-[150px]">
                    <span className="text-lg font-bold mb-2">Website</span>
                    <input
                        type="text"
                        placeholder="Link to website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 w-full h-[40px] outline-none border-2 border-gray-300 focus:border-blue-500"
                    />
                </div> 
                <div className="flex flex-col items-start justify-center w-[150px]">
                    <span className="text-lg font-bold mb-2">Zipcode</span>
                    <input
                        type="text"
                        placeholder="Provider zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 w-full h-[40px] outline-none border-2 border-gray-300 focus:border-blue-500"
                    />
                </div> 
                <div className="flex flex-col items-start justify-center w-[150px]">
                    <span className="text-lg font-bold mb-2">Phone Number</span>
                    <input
                        type="text"
                        placeholder="(123) 456-7890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 w-full h-[40px] outline-none border-2 border-gray-300 focus:border-blue-500"
                    />
                </div> 
                <div className="flex flex-col items-start justify-center w-[150px]">
                    <span className="text-lg font-bold mb-2">Email Address</span>
                    <input
                        type="text"
                        placeholder="user@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 w-full h-[40px] outline-none border-2 border-gray-300 focus:border-blue-500"
                    />
                </div>                                                               
            </div>    
            <div className="w-[60%] flex flex-col justify-center items-start mb-10">
                <span className="text-lg font-bold mb-2">Tags</span>
                <div className="w-full flex justify-between items-center mb-4">
                    {
                        TAGS.slice(0, 8).map((tag, index) => <TagCheckbox key={index} currentTag={tag} tags={tags} setTags={setTags} />)
                    }
                </div>
                <div className="w-full flex justify-between items-center">
                    {
                        TAGS.slice(8, 16).map((tag, index) => <TagCheckbox key={index} currentTag={tag} tags={tags} setTags={setTags} />)
                    }
                </div>
            </div>  
            <div className="w-[60%] flex flex-col justify-center items-center mb-10">
                <button onClick={handleSubmit} className="bg-black rounded-md px-10 py-2 text-white text-xl font-bold mb-2 hover:text-[#F87E32] transition-all duration-150">Save</button>
                <div className="flex items-center"><input type="checkbox" checked={hidden} onChange={() => setHidden(prev => !prev)} className="w-[20px] h-[20px] mr-2" /><p>Hide Provider</p></div>
            </div>                    
        </div>
    )
}