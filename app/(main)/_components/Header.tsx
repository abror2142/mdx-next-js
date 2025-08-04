'use client'

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useTheme } from "next-themes";
import ThemeButton from "../../../components/shared/ThemeButton";

function Header () {
    const { setTheme, theme } = useTheme();

    return (    
        <nav className="px-6 py-3 border-b border-custom flex justify-between items-center">
            <div className="flex gap-1 items-end">
                <p className="text-3xl font-semibold font-mono">easy</p>
                <p className="text-xl font-semibold">Docs</p>
            </div>
            <div className="grow-1 flex gap-3 items-center justify-end">
                <Formik
                    initialValues={{ 
                        term: ''
                        }}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    <Form className="grow-1 flex items-center border border-custom gap-2 px-2 py-1 rounded-sm max-w-lg">
                        <button type="submit" className="border-r border-custom pr-2">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                        </button>
                        <Field name="term" className="grow-1 outline-none text-gray-600" placeholder="Search \" />
                    </Form>
                </Formik>
                <ThemeButton />
            </div>
        </nav>
    )
}

export default Header;