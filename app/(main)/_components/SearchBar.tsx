import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Link from "next/link";
import { useTree } from "@/contexts/TreeContext";
import makeHierarchy from "../_utils/makeHierarchy";
import MatchType from "../_types/MatchType";
import { v4 } from "uuid";

function SearchBar() {
    const [term, setTerm] = useState<string | null>(null);
    const [matches, setMatches] = useState<MatchType[]>([]);
    const { tree } = useTree();

    const search = async (term: string) => {
        try {
            const url = `/api/articles/search?term=${term}`;
            const response = await axios.get(url);
            setMatches(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(term) search(term);
        else setMatches([]);
    }, [term])

    return (
        <div className="relative grow-1 flex max-w-lg flex-col text-custom">
            <form className="grow-1 flex items-center border border-custom gap-2 px-2 py-1 rounded-sm">
                <button type="submit" className="border-r border-custom pr-2">
                    <FontAwesomeIcon icon={faSearch} className="" />
                </button>
                <input value={term || ""} onChange={(e) => setTerm(e.target.value)} name="term" className="grow-1 outline-none" placeholder="Search \" />
                <div className="w-4 flex items-center justify-center text-red-500 hover:text-red-600" onClick={() => setTerm(null)}>
                    <FontAwesomeIcon icon={faX} className="text-[12px]"/>
                </div>
            </form>
            {
                matches
                && matches.length > 0
                && <ul className="absolute top-9 bg-custom w-full border border-custom rounded-sm px-4 py-2 text-sm flex flex-col gap-2">
                    {
                        matches.map(match => (
                        <li className="py-0.5 px-2 rounded-sm hover:bg-gray-100 component-bg-custom-hover" key={v4()}>
                            <Link href={`/guides${makeHierarchy({node: match, tree, parentId: match.parent})}`} className="flex flex-col gap-0.5" onClick={() => setTerm(null)}>
                                {match.text}
                                <p dangerouslySetInnerHTML={{ __html:  match?.screenshot}} className="text-[12px]"></p>
                            </Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default SearchBar;