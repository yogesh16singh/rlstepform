import { useState, useEffect } from 'react';
import { getAllDetails } from '../services/userDetails';
import UserTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import Loader from '../components/Loader';

function Home() {
    const navigate: any = useNavigate();
    let id: string | null = localStorage.getItem('userId');
    const [data, setData] = useState<any>([]);
    const [loade, setLoade] = useState<boolean>(true);

    useEffect(() => {
        // console.log('111');
        (async () => {
            const detailsData = await getAllDetails(id);
            console.log('details', detailsData);
            setLoade(false);
            setData(detailsData);
        })()
    }, []);


    // console.log('data', data);
    return (
        <div>
            {loade && <Loader />}
            <div className='flex flex-wrap justify-center gap-4 '>
                <SearchComponent setData={setData} />
                <button onClick={() => navigate('/userdetails')} className="my-4 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="button">
                    Add More Details +
                </button>
                <h2 className='my-4 bg-blue-800  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '>Result Based On Submission Date </h2>
            </div>

            <UserTable users={data} />
        </div>
    )
}

export default Home