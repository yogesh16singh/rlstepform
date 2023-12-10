import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from "../redux/authSlice";
import { loginapi } from "../services/login";
import Loader from "../components/Loader";


interface formStateProps {
    email: string,
    password: string
}


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [emailerror, setEmailerror] = useState<boolean>(false)
    const [passworderror, setPassworderror] = useState<boolean>(false);
    const [formData, setFormData] = useState<formStateProps>({
        email: '',
        password: ''
    });
    const [loader, setLoader] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const formSubmit = async () => {
        setLoader(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(formData.email);
        if (!isValid) {
            setEmailerror(true);
            setLoader(false);
            return;
        };

        const submit = await loginapi(formData?.email, formData?.password);

        // console.log('submit', submit);

        if (submit?.message === 'Login successful') {
            const token = submit?.token;
            dispatch(login(token));
            localStorage.setItem('userId', submit?.userId)
            navigate('/userdetails');
        } else {
            setErrorMessage(submit.error);
        }

        setLoader(false);
    };

    return (
        <>
            <div className="w-full max-w-xs">
                {loader && <Loader />}
                <p className="text-2xl font-bold mb-4">Login</p>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" >
                            Email
                        </label>
                        <input onClick={() => setEmailerror(false)} value={formData?.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} className={`dark:text-white shadow appearance-none border ${!emailerror ? "border" : "border-red-500"} mb-3 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} id="username" type="text" placeholder="email" />
                        {emailerror ? <p className="text-red-500 text-xs italic">Please choose a correct email.</p> : ''}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left" >
                            Password
                        </label>
                        <input onClick={() => setPassworderror(false)} value={formData?.password} onChange={(e: any) => setFormData({ ...formData, password: e.target.value })} className={`dark:text-white shadow appearance-none border ${!passworderror ? "border" : "border-red-500"} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`} id="password" type="password" placeholder="******************" />
                        {passworderror ? <p className="text-red-500 text-xs italic">Please choose a password.</p> : ''}
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={formSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Sign In
                        </button>
                    </div>
                    <p className="text-red-500 text-xs italic mt-2 font-bold">{errorMessage}</p>
                </form>
                <p>Dont have account? <Link to="/registration">Registration</Link></p>
            </div>
        </>
    )
}

export default Login