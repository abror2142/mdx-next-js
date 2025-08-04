'use client'

import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faImage } from "@fortawesome/free-regular-svg-icons";
import { Formik, Form, Field } from "formik";
import { faCloudUpload, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface ImageUploaderProps {
    addImage: (url: string, alt: string, title: string, caption: string) => void;
}

export default function ImageUploader({addImage}: ImageUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        setFile(selected);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const { data } = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUrl(data.path);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed.');
        } 
    };
    
    const handleSave = (alt: string, title: string, caption: string) => {
        if(url){
            addImage(url, alt, title, caption);
            setOpen(false);
        }
    }

    useEffect(() => {
        if(file) {
            handleUpload()
        }
    }, [file])

    return (
        <>
            {
                open
                ? <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white flex flex-col gap-3 px-8 py-8 rounded-md min-w-sm relative">
                        <p className="text-xl font-semibold text-center">Add Image</p>
                        <div 
                            className="absolute top-5 right-5 w-8 h-8 text-red-500 hover:text-red-600 flex items-center justify-center rounded-sm hover:bg-gray-200"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </div>
                    
                        <div className="flex gap-2">
                            <div 
                                className={`bg-gray-100 px-3 py-1.5 flex gap-4 justify-between items-center rounded-sm w-full text-gray-500 ${!url && 'cursor-not-allowed'}`} 
                            >
                                <p className="max-w-65 overflow-x-auto text-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                    {url ? url : 'Image path ...'}
                                </p>
                                <FontAwesomeIcon 
                                    icon={faCopy} 
                                    onClick={async () => url && await navigator.clipboard.writeText(url) }
                                    className="text-lg hover:bg-gray-200 p-1.5 rounded-full"
                                />
                            </div>
                            <div className="px-3 py-1 flex items-center justify-center rounded-sm bg-indigo-500 hover:bg-indigo-600">
                                <label 
                                    htmlFor="image-upload" 
                                    className="text-white hover:cursor-pointer text-lg">
                                    <FontAwesomeIcon icon={faCloudUpload} />
                                </label>
                                <input type="file" id="image-upload" className="hidden" accept=".gif,.jpg,.jpeg,.png" onChange={handleFileChange}/>
                            </div>
                        </div>
                    
                        <Formik
                            initialValues={{
                                alt: '',
                                title: '',
                                caption: ''
                            }}
                            onSubmit={async (values) => {
                               handleSave(values.alt, values.title, values.caption);
                            }}
                            >
                            <Form className="flex flex-col gap-3">  
                                <p>Optional Information</p>
                                <div className="flex flex-col">
                                    <label 
                                        htmlFor="alt" 
                                        className="text-gray-500"
                                    >
                                        Alternative text
                                    </label>
                                    <Field 
                                        id="alt" 
                                        name="alt" 
                                        className="outline-none bg-gray-100 px-2 py-1.5 rounded-sm" 
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label 
                                        htmlFor="title" 
                                        className="text-gray-500"
                                    >
                                        Title
                                    </label>
                                    <Field 
                                        id="title" 
                                        name="title" 
                                        className="outline-none bg-gray-100 px-2 py-1.5 rounded-sm"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label 
                                        htmlFor="caption" 
                                        className="text-gray-500"
                                    >
                                        Image Caption
                                    </label>
                                    <Field 
                                        id="caption" 
                                        name="caption" 
                                        className="outline-none bg-gray-100 px-2 py-1.5 rounded-sm"
                                    />
                                </div>
                        
                                <div className="flex items-center justify-end">
                                    <button 
                                        type="submit" 
                                        className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-1 rounded-sm"
                                    >Add</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                : <div>
                    <button 
                        className="px-1.5 py-0.5 text-gray-600 hover:text-blue-600 rounded-sm text-xl bg-gray-100 hover:bg-gray-200" 
                        onClick={() => setOpen(true)}
                    >
                        <FontAwesomeIcon icon={faImage}/>
                    </button>
                </div>
            } 
        </>
    )
}