import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, CheckSquare } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <CheckSquare className="h-8 w-8 text-indigo-600" />
                            <span className="font-bold text-xl text-gray-900">TaskApp</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <User className="h-5 w-5" />
                            <span className="font-medium">{user.name}</span>
                            <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-800 uppercase font-bold">
                                {user.role}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-4 inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
