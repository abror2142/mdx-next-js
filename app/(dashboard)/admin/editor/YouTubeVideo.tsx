import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, Field } from "formik";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

interface YouTubeVideoProps {
    addYoutubeVideo: (url: string) => void;
}

export default function YouTubeVideo({ addYoutubeVideo }: YouTubeVideoProps) {
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState(false);

    return (
        <>
            {
                open
                ? <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <div className="bg-white flex flex-col gap-3 px-8 py-8 rounded-md min-w-sm relative">
                        <p className="text-xl font-semibold text-center">Add YouTube Video</p>
                        <div 
                            className="absolute top-5 right-5 w-8 h-8 text-red-500 hover:text-red-600 flex items-center justify-center rounded-sm hover:bg-gray-200"
                            onClick={() => setOpen(prev => !prev)}
                        >
                            <FontAwesomeIcon icon={faX} />
                        </div>
                        {
                            <Formik
                            initialValues={{
                                id: ''
                            }}
                            onSubmit={async (values) => {
                               addYoutubeVideo(values.id);
                               setOpen(false);
                            }}
                            >
                            <Form className="flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <label 
                                        htmlFor="id" 
                                        className="text-gray-500"
                                    >
                                        YouTube Video URL
                                    </label>
                                    <Field 
                                        id="id" 
                                        name="id" 
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
                        }
                    </div>
                </div>
                : <div>
                    <button 
                        className="px-1.5 py-0.5 hover:text-red-600 rounded-sm text-xl bg-gray-100 hover:bg-gray-200 text-red-500" 
                        onClick={() => setOpen(true)}
                    >
                        <FontAwesomeIcon icon={faYoutube}/>
                    </button>
                </div>
            } 
        </>
    )
}