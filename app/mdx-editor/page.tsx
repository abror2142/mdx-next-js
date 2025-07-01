'use client'

import { useEffect, useState } from "react"
import { Preview } from "./Preview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ImageUploader from "./ImageUploader";
import YouTubeVideo from "./YouTubeVideo";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

export default function () {
    const [markdown, setMarkdown] = useState<string>("");
    const [showPreview, setShowPreview] = useState(false);

    const addYoutubeVideo = (id: string) => {
        if(id)
            setMarkdown(markdown + `\n<YouTube id="${id}" />\n`)
    }

    const addImage = (url: string) => {
        if(url)
            setMarkdown(markdown + `\n<img src="${url}" />\n`)
    }

    return (
        <div className="grow-1 flex flex-col gap-3 m-8 max-w-6xl w-full mx-auto">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 bg-gray-200 rounded-sm px-3 py-1.5">
                    <button 
                        className={`px-2 py-0.5  max-w-min rounded-sm ${!showPreview && 'bg-indigo-500 text-white'}`}
                        onClick={() => setShowPreview(!showPreview)}
                    >Editor</button>
                    <button 
                        className={`px-2 py-0.5  max-w-min rounded-sm ${showPreview && 'bg-indigo-500 text-white'} `}
                        onClick={() => setShowPreview(!showPreview)}
                    >Preview</button>
                </div>
                <div className="text-xl mr-5 bg-gray-200 rounded-sm px-3 py-1.5">
                    <FontAwesomeIcon icon={faMoon} />
                </div>
            </div>
            <div className="grow-1 flex gap-4">
                {
                    showPreview
                    ? <div className="w-full grow-1 flex flex-col">
                        <div className="grow-1 bg-white rounded-md p-5 overflow-auto">
                            {
                                markdown 
                                && <div className="prose">
                                    <Preview source={markdown} />
                                </div>
                            }
                        </div>
                    </div>
                    : <div className="w-full grow-1 flex flex-col">
                        <div className="grow-1 flex relative bg-white rounded-b-md rounded-tr-md">
                            <textarea 
                                className="grow-1 outline-none p-5" 
                                onChange={(e) => setMarkdown(e.target.value)}
                                value={markdown}
                            ></textarea>
                            {
                                showPreview
                                && <div className="absolute top-1/2 right-0">
                                    <button className="px-1.5 py-0.5">
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>
                                </div>
                            }
                        <div className="absolute bottom-2 right-2 flex gap-2">
                            <ImageUploader addImage={addImage} />
                            <YouTubeVideo addYoutubeVideo={addYoutubeVideo} />
                        </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}