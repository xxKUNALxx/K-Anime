// import React, { useState, useEffect } from 'react';
// import Card from './Card';
// import { Link } from 'react-router-dom';
// import backgroundImage from '../assets/img.jpg'

// const Search = ({ data }) => {
//   const [query, setQuery] = useState(data);
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (query) {
//       setLoading(true);
//       setSearchResults([]);

//       async function fetchSearchData() {
//         try {
//           const res = await fetch(
//             `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/${encodeURIComponent(query)}`,
//             { cache: 'no-store' }
//           );
//           const result = await res.json();
//           setSearchResults(result.results || []);
//         } catch (error) {
//           console.error('Error fetching search data:', error);
//           setSearchResults([]);
//         } finally {
//           setLoading(false);
//         }
//       }

//       fetchSearchData();
//     } else {
//       setSearchResults([]);
//       setLoading(false);
//     }
//   }, [query]);

//   const handleCardClick = () => {
//     setQuery(''); // Clear the query
//     setSearchResults([]); // Clear search results
//   };

//   const hasData =
//     searchResults && Array.isArray(searchResults) && searchResults.length > 0;

//   return (
//     <div 
//           className="relative h-full p-4 bg-cover bg-center bg-fixed transition-opacity duration-1000"
//           style={{ backgroundImage: `url(${backgroundImage})`, opacity: loading ? 0 : 1 }}
//         >
//       {/* Hide the query title when there are no results */}
//       {query && hasData && (
//         <h1 className="text-white p-5 text-3xl font-semibold">{query}</h1>
//       )}
      
//       {loading ? (
//         <div className="text-white text-lg">Loading...</div>
//       ) : hasData ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//           {searchResults.map((anime) => (
//             <Link 
//               to={`/details/${anime.id}`} 
//               key={anime.id} 
//               onClick={handleCardClick} // Clear search and query on click
//             >
//               <Card 
//                 title={anime.title} 
//                 image={anime.image}
//               />
//             </Link>
//           ))}
//         </div>
//       ) : (
//         !loading && query && (
//           <div className="text-white text-lg">No results found</div>
//         )
//       )}
//     </div>
//   );
// };

// export default Search;


import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/img.jpg';

const Search = ({ data }) => {
  const [query, setQuery] = useState(data);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setSearchResults([]);

      async function fetchSearchData() {
        try {
          const res = await fetch(
            `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/${encodeURIComponent(query)}`,
            { cache: 'no-store' }
          );
          const result = await res.json();
          setSearchResults(result.results || []);
        } catch (error) {
          console.error('Error fetching search data:', error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      }

      fetchSearchData();
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  }, [query]);

  const handleCardClick = () => {
    setQuery(''); // Clear the query
    setSearchResults([]); // Clear search results
  };

  const hasData =
    searchResults && Array.isArray(searchResults) && searchResults.length > 0;

  return (
    <div 
      className="relative h-full p-4 bg-cover bg-center bg-fixed transition-opacity duration-1000"
      style={{ backgroundImage: `url(${backgroundImage})`, opacity: loading ? 0 : 1 }}
    >
      {/* Hide the query title when there are no results */}
      {query && hasData && (
        <h1 className="text-white p-2 text-2xl md:text-3xl font-semibold">
          {query}
        </h1>
      )}
      
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : hasData ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
          {searchResults.map((anime) => (
            <Link 
              to={`/details/${anime.id}`} 
              key={anime.id} 
              onClick={handleCardClick} // Clear search and query on click
            >
              <Card 
                title={anime.title} 
                image={anime.image}
              />
            </Link>
          ))}
        </div>
      ) : (
        !loading && query && (
          <div className="text-white text-lg">No results found</div>
        )
      )}
    </div>
  );
};

export default Search;
