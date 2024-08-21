import React, { useState, useEffect } from 'react';
import Search from './Search';
import { Link } from 'react-router-dom';

function Navbar() {
    const [searchValue, setSearchValue] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            setShowSearchResults(true);
        }
    };

    useEffect(() => {
        if (!searchValue.trim()) {
            setShowSearchResults(false);
        }
    }, [searchValue]);

    return (
        <>
            <nav className="bg-gradient-to-r from-blue-900 via-black to-blue-900 text-white h-16 flex items-center px-6 shadow-lg">
                <Link to="/">
                    <h1 className="text-4xl font-bold tracking-wide">K-Anime</h1>
                </Link>
                <div id="inputsearch" className="ml-auto">
                    <form onSubmit={handleSearch} className="relative flex items-center">
                        <input 
                            className="bg-gray-900 rounded-full h-10 w-full max-w-[350px] text-gray-200 px-4 border-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
                            placeholder="Search Anime..."
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                        <button 
                            type="submit"
                            className="ml-3 text-gray-400 hover:text-blue-300 focus:outline-none transition-colors duration-300 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 0v6m4 4H6a2 2 0 01-2-2V8a2 2 0 012-2h4.586a1 1 0 00.707-.293l1.414-1.414A1 1 0 0112.586 4H16a2 2 0 012 2v10a2 2 0 01-2 2h-4m-4 4a2 2 0 002 2h6a2 2 0 002-2m-4-4h.01" />
                            </svg>
                        </button>
                    </form>
                </div>
            </nav>
            {showSearchResults && <Search data={searchValue} />}
        </>
    );
}

export default Navbar;
