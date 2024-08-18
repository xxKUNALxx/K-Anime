// import React, { useState } from 'react';


// function Navbar() {
//     const [searchValue, setSearchValue] = useState('');
    

//     const handleInputChange = (e) => {
//         setSearchValue(e.target.value);
//     };

//     const handleSearch = (e) => {
//         e.preventDefault(); 
//         if (searchValue.trim()) {
//             <searchValue data={searchValue}/>
//         }
//     };

//     console.log(searchValue);

//     return (
//         <nav className="bg-black text-white h-16 flex items-center px-4">
//             <h1 className='text-4xl font-bold'>K-Anime</h1>
//             <div id="inputsearch" className="ml-auto">
//                 <form onSubmit={handleSearch}>
//                     <input 
//                         className="bg-gray-800 rounded-full h-10 w-full max-w-[300px] text-gray-200 px-4 border-2 border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
//                         placeholder="Search"
//                         value={searchValue}
//                         onChange={handleInputChange}
//                     />
//                 </form>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;

import React, { useState, useEffect } from 'react';
import Search from './Search';

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

    console.log(searchValue);
    return (
        <>
            <nav className="bg-black text-white h-16 flex items-center px-4">
                <a href="\Pages\Main">
                <h1 className='text-4xl font-bold'>K-Anime</h1>
                </a>
                <div id="inputsearch" className="ml-auto">
                    <form onSubmit={handleSearch}>
                        <input 
                            className="bg-gray-800 rounded-full h-10 w-full max-w-[300px] text-gray-200 px-4 border-2 border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                            placeholder="Search"
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>
            </nav>
            {showSearchResults && <Search data={searchValue} />}
        </>
    );
}

export default Navbar;
