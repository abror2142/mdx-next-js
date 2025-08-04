'use client'

import { useEffect, useState } from "react"
import { Preview } from "./Preview";
import ImageUploader from "./ImageUploader";
import YouTubeVideo from "./YouTubeVideo";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useTree } from "@/app/(dashboard)/_contexts/TreeContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DeleteButton from "../../_components/buttons/DeleteButton";

export type FolderPath = {
    name: string | null,
    fullPath: string | null,
}

export const cleanUrl = (s: string) => {
    // Replace spaces with '-', keep '&' as is, omit '?', remove other unsafe chars
    // Remove trailing '-'
    // URL-safe: a-zA-Z0-9-._~ (RFC 3986), plus '&'
    return s
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-') // spaces to dash
        .split('')
        .filter(c => /[a-z0-9\-._~&]/.test(c)) // omit '?'
        .join('')
        .replace(/-+$/, ''); // remove trailing dashes
}

export default function () {
    const [markdown, setMarkdown] = useState<string | undefined | null>(undefined);
    const { tree, setTree, syncTree } = useTree();

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    const [currentMeta, setCurrentMeta] = useState<{
        text: string;
        parentText: string;
        published: boolean;
    }>({
        text: "",
        parentText: "",
        published: false,
    });

    useEffect(() => {
        const file = tree.find(file => file.id == id);
        setCurrentMeta({
            text: file?.text ?? "",
            parentText: tree.find(item => item.id == file?.parent)?.text ?? "root",
            published: !!file?.data?.published,
        });
    }, [tree, id]);

    const fetchFile = async () => {
        try {
            const response = await axios.get(`/api/articles/${id}`);
            setMarkdown(response.data?.content);
        } catch(e) {
            setMarkdown(null);
            console.log(e);
        }
    }

    const handleSave = async () => {
        if (!markdown || !id) return;

        const formData = new FormData();
        formData.append('content', markdown);
        formData.append('id', id);
        try {
            const response = await axios.post('/api/articles', formData, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            await syncTree();
            if(response.status === 200) {
                router.push(`/admin/guides/${id}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed.');
        }
    };

    useEffect(() => {
        fetchFile();
    },[id])

    const handleDisplayName = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value;
        const newTree = tree.map(item => item.id == id ? { ...item, text: value, data: { ...item.data, url: cleanUrl(value)} } : item)
        setCurrentMeta(meta => ({ ...meta, text: value }));
        setTree(newTree);
        await syncTree(newTree);
    };
    
    const handlePublishedChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const checked = e.target.checked;
        setCurrentMeta(meta => ({ ...meta, published: checked }));
        const newTree = tree.map(item => item.id == id ? { ...item, data: { ...item.data,  published: checked, } } : item)
        setTree(newTree);
        await syncTree(newTree)
    };

    const addImage = (url: string) => {
        setMarkdown((prev) => (prev ?? "") + `\n![image](${url})\n`);
    };
    
    const addYoutubeVideo = (url: string) => {
        setMarkdown((prev) => (prev ?? "") + `\n<YouTubeVideo url="${url}" />\n`);
    };

    return (
        <div className="relative grow-1 h-full flex">
            {
                markdown === undefined
                ? <div role="status" className="absolute inset-0 flex items-center justify-center z-10">
                     <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                     </svg>
                     <span className="sr-only">Loading...</span>
                </div>
                : markdown === null
                ? <p>No File Found</p>
                : <form className="grow-1 h-full flex flex-col p-4 rounded-md w-full gap-2 text-sm" onSubmit={e => e.preventDefault()}>
                    <div className="w-full grow-1 flex flex-col gap-1">
                        <p className="font-semibold">Meta Info</p>
                        <div className="flex gap-4 items-center">
                            <div className="grow-1 flex items-center border border-custom px-2 py-1.5 rounded-sm">
                                <label className="border-r border-gray-300 pr-2 text-nowrap">Display Name <span className="text-red-500 text-base">*</span></label>
                                <input onChange={handleDisplayName} className="w-full h-full outline-none pl-2" value={currentMeta.text} />
                            </div>

                            <div className="grow-1 flex items-center border border-custom px-2 py-1.5 rounded-sm">
                                <label className="border-r border-custom pr-2 text-nowrap">Parent <span className="text-red-500 text-base">*</span></label>
                                <input disabled value={currentMeta.parentText} className="w-full h-full outline-none pl-2" />
                            </div>
                            <div>
                                <label className="flex gap-2">
                                    <input
                                        type="checkbox"
                                        checked={currentMeta.published}
                                        onChange={handlePublishedChange}
                                    />
                                    Published
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grow-1 flex flex-col gap-4  h-full rounded-md w-full">
                        <div className="grow-1 flex gap-4">
                            <div className="w-full grow-1 flex flex-col gap-1 ">
                                <p className="font-semibold">Editor</p>
                                <div className="grow-1 flex relative border border-custom rounded-b-md rounded-tr-md">
                                    <textarea onChange={(e) => setMarkdown(e.target.value)} value={markdown} className="grow-1 w-full h-full p-5 "></textarea>
                                    <div className="absolute bottom-2 right-2 flex gap-2">
                                        <ImageUploader addImage={addImage} />
                                        <YouTubeVideo addYoutubeVideo={addYoutubeVideo} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full grow-1 flex flex-col gap-1">
                                <p className="font-semibold">Preview</p>
                                <div className="grow-1 border border-custom rounded-md p-5 overflow-auto">
                                    <div className="prose dark:prose-invert">
                                        <Preview source={markdown} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-4 items-center">
                            <button className="bg-indigo-500 hover:bg-indigo-600 px-4 py-1.5 text-white text-sm rounded-sm" type="button" onClick={handleSave}>Save</button>
                            {tree.find(item => item.id == id) && (
                                <DeleteButton node={tree.find(item => item.id == id)!} />
                            )}
                        </div>
                    </div>
                </form>
            }
        </div>
    );
}