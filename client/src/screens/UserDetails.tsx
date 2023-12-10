import { useState } from "react"
import BasicDetails from "../components/BasicDetails"
import FileUpload from "../components/FileUploadComponent"
import DropDown from "../components/MultiSelectDropdown"


function UserDetails() {
    const [form, setForm] = useState<number>(0);
    const [allFormData, setAllFormData] = useState<any>({

    });

    // console.log('all', allFormData);
    return (
        <>
            {form === 0 && <BasicDetails setAllFormData={setAllFormData} allFormData={allFormData} setForm={setForm} />}
            {form === 1 && <FileUpload setAllFormData={setAllFormData} allFormData={allFormData} setForm={setForm} />}
            {form === 2 && <DropDown setAllFormData={setAllFormData} allFormData={allFormData} setForm={setForm} />}
            <div className="flex justify-around mt-20 px-80">
                <div className={`w-24 h-1 ${form == 0 ? "bg-blue-500" : "bg-gray-200"} rounded`}></div>
                <div className={`w-24 h-1 ${form == 1 ? "bg-blue-500" : "bg-gray-200"} rounded`}></div>
                <div className={`w-24 h-1 ${form == 2 ? "bg-blue-500" : "bg-gray-200"} rounded`}></div>
            </div>
        </>
    )
}

export default UserDetails 