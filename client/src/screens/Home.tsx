import { useState, useEffect } from 'react';
import { getAllDetails } from '../services/userDetails';
import UserTable from '../components/Table';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

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
        <div className='top-0'>
            <Navbar></Navbar>
            {loade && <Loader />}
            <div className='flex md:justify-center flex-wrap flex-col lg:flex-row gap-2 '>
                <SearchComponent setData={setData} />
                <div className='flex justify-center '>
                    <button onClick={() => navigate('/userdetails')} className=" flex justify-center  my-4 bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="button">
                        Add More Details +
                    </button>
                </div>
                <div className='flex justify-center '>
                    <h2 className='flex justify-center my-4 bg-blue-800  text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline '>Result Based On Submission Date </h2>
                </div>
            </div>

            <UserTable users={data} />
        </div>
    )
}

export default Home