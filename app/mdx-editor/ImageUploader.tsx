import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { Formik, Form, Field } from "formik";
import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function ImageUploader({addImage}) {
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedPath, setUploadedPath] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        setFile(selected);
        if (selected) {
            setPreviewUrl(URL.createObjectURL(selected));
            setUploadedPath(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const { data } = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            addImage(data.path);
            setOpen(false);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed.');
        } finally {
            setUploading(false);
        }
    };

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
                        <div className="flex gap-2 items-center">
                            <button 
                                className={`px-2 py-0.5 rounded-sm hover:bg-gray-300 ${!upload && 'bg-gray-300'}`}
                                onClick={() => setUpload(false)}         
                            >url</button>
                            <button 
                                className={`px-2 py-0.5 rounded-sm hover:bg-gray-300 ${upload && 'bg-gray-300'}`}
                                onClick={() => setUpload(true)}
                            >upload</button>
                        </div>
                        {
                            upload 
                            ?  <div className="flex gap-2">
                                    <p 
                                        className="bg-gray-100 px-2 py-1.5 rounded-sm w-full text-gray-500 cursor-not-allowed" 
                                    >Image URL ...
                                    </p>
                                    <label 
                                        htmlFor="image-upload" 
                                        className="flex px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white items-center max-w-min  rounded-sm border hover:cursor-pointer">
                                        <FontAwesomeIcon icon={faUpload}/>
                                    </label>
                                    <input type="file" id="image-upload" className="hidden" accept=".gif,.jpg,.jpeg,.png" onChange={handleFileChange}/>
                                </div>
                            : <input 
                                type="text" 
                                onChange={handleFileChange} 
                                className="outline-none bg-gray-100 px-2 py-1.5 rounded-sm" 
                                placeholder="Image URL ..."
                            />
                        }
                        <Formik
                            initialValues={{
                                alt: '',
                                title: '',

                            }}
                            onSubmit={async (values) => {
                               handleUpload()
                            }}
                            >
                            <Form className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <label 
                                        htmlFor="alt" 
                                        className="text-gray-500"
                                    >
                                        Alt <span className="text-sm">(optional)</span>
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
                                        Title <span className="text-sm">(optional)</span>
                                    </label>
                                    <Field 
                                        id="title" 
                                        name="title" 
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