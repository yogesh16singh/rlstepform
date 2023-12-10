import React, { useState } from "react";
import { getAllDetailsByEmail } from "../services/userDetails";
import Loader from "./Loader";

import { getAllDetails } from '../services/userDetails';
type MyFunctionType = (num: number) => void;

interface basicDetailsProps {
    setData: MyFunctionType,
    idata: any
}

const SearchComponent: React.FC<basicDetailsProps> = ({ setData, idata }) => {
    let id: string | null = localStorage.getItem('userId');
    const [email, setText] = useState<string>('');
    const [loade, setLoade] = useState<boolean>(false);
    const initialData = idata;
    const onSubmit = async () => {
        setLoade(true);
        if (email == "") {
            setData(initialData);
            (async () => {
                const detailsData = await getAllDetails(id);
                console.log('details', detailsData);
                setLoade(false);
                setData(detailsData);
            })()
        }
        else {
            const data = await getAllDetailsByEmail(email);
            setData(data);
            console.log(data, 'data');
            setText('');
        }
        setLoade(false);
    }
    return (
        <>
            {loade && <Loader />}
            <div className="flex justify-center top-0 ">
                <div className="flex border border-blue-400 rounded">
                    <input
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        className="block w-full px-4 py-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search by email..."
                    />
                    <button onClick={onSubmit} className="px-4 text-white bg-blue-600 border-l rounded ">
                        Search
                    </button>
                </div>
            </div>
        </>
    );
}

export default SearchComponent;