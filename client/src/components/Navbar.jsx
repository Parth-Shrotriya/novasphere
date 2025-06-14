import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'
import { useNavigate, Link } from 'react-router-dom'
import Button from './ui/Button';

const Navbar = () => {
    const { isAuthenticated, setUser, setIsAuthenticated } = 
        useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/');
    }

    return (
        <nav 
            className='flex justify-between items-center
            px-5 w-full md:w-[50vw] mx-auto mt-5 mb-5'>
            <Link to={"/"} className="text-2xl">
                NovaSphere
            </Link>
            {
                isAuthenticated ? (
                    <ul className='flex gap-3'>
                        <Link 
                            className='px-5 py-2 bg-amber-300 rounded-lg text-sm cursor-pointer
                            hover:shadow-md transition-all druation-300 ease-in-out' 
                            to={"/dashboard"}>
                                Dashboard
                        </Link>
                        <Button text="Logout" onClick={handleLogout}/>
                    </ul> 
                ):(
                    <ul className='flex gap-3'>
                        <Link 
                            className='px-5 py-2 bg-amber-300 rounded-lg text-sm cursor-pointer
                            hover:shadow-md transition-all druation-300 ease-in-out' 
                            to={"/signup"}>
                                Sign Up
                        </Link>
                        <Link 
                            className='px-5 py-2 bg-amber-300 rounded-lg text-sm cursor-pointer
                            hover:shadow-md transition-all druation-300 ease-in-out' 
                            to={"/login"}>
                                Login
                        </Link>
                    </ul>
                
                )
            }
        </nav>
    );
};

export default Navbar