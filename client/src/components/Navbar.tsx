
import { useDispatch } from 'react-redux';
import { logout } from "../redux/authSlice";

const Navbar = () => {

    const dispatch = useDispatch();
    const logou = () => {
        dispatch(logout());

    }
    return (
        <div className="mx-auto flex flex-wrap  flex-col md:flex-row justify-between items-center md:h-28 m-0 p-2">
            <a className="flex title-font w-1/4 font-medium justify-center items-center text-gray-900 mb-4 h-6">
                <img className="h-28" src={"data:image/jpeg;base64,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"} alt='logo' />
            </a>

            <button className="inline-flex items-center bg-blue-500 border-0 py-1 px-3 mt-4" onClick={() => logou()}>Logout</button>
        </div>
    )
}

export default Navbar