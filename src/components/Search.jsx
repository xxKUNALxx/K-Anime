// // import React, { useState, useEffect } from 'react';
// // import Card from './Card';

// // const Search = ({ data }) => {

// // //   const query = decodeURIComponent(data?.results.id || '');
// //     const query= data;
// //   console.log('Query:', data);

// //   const [searchResults, setSearchResults] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (query) {  // Ensure query is not empty before making the request
// //       async function fetchSearchData() {
// //         try {
// //           const res = await fetch(
// //             // `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/${encodeURIComponent(query)}`,
// //             `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/${query}`,
// //             { cache: 'no-store' }
// //           );
// //           const result = await res.json();
// //           setSearchResults(result.results || []);
// //         } catch (error) {
// //           console.error('Error fetching search data:', error);
// //           setSearchResults([]);
// //         } finally {
// //           setLoading(false);
// //         }
// //       }

// //       fetchSearchData();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [query]);

// //   const hasData =
// //     searchResults && Array.isArray(searchResults) && searchResults.length > 0;

// //   return (
// //     <div className="m-8" id="animegrid">
// //       {loading ? (
// //         <div className="text-white text-lg">Loading...</div>
// //       ) : hasData ? (
// //         <div className="flex flex-wrap gap-8">
// //           {searchResults.map((anime) => (
// //             <Card 
// //               key={anime.id} 
// //               title={anime.title} 
// //               image={anime.image} 
// //             />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="text-white text-lg">No results found</div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Search;


// import React, { useState, useEffect } from 'react';
// import Card from './Card';

// const Search = ({ data }) => {
//   const query = data;
//   console.log('Query:', data);

//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false); // Start with loading false

//   useEffect(() => {
//     if (query) {  // Ensure query is not empty before making the request
//       setLoading(true);
//       setSearchResults([]); // Clear previous results

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
//       setSearchResults([]); // Clear results if query is empty
//       setLoading(false);
//     }
//   }, [query]);

//   const hasData =
//     searchResults && Array.isArray(searchResults) && searchResults.length > 0;


//     const handleCardClick = (anime) => {
//         console.log("Card clicked:", anime); 
//         setSelectedAnime(anime);
//       };
      

//   return (
//     <div className="relative bg-cover bg-center h-full p-3" style={{ 
//         backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images5.alphacoders.com/135/thumb-1920-1355115.jpeg')" 
//       }}>
//       <h1 className='text-white p-5 text-3xl font-semibold'>{query}</h1>
//       {loading ? (
//         <div className="text-white text-lg">Loading...</div>
//       ) : hasData ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        
//           {searchResults.map((anime) => (
//             <Card 
//               key={anime.id} 
//               title={anime.title} 
//               image={anime.image} 
//               onClick={() => handleCardClick(anime.id)}
//             />
//           ))}
//         </div>
//       ) : (
//         !loading && query && <div className="text-white text-lg">No results found</div>
        
//       )}
//     </div>
//   );
// };

// export default Search;


import React, { useState, useEffect } from 'react';
import Card from './Card';
import Details from '../Pages/Details'; 

const Search = ({ data }) => {
  const query = data;
  console.log('Query:', data);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Start with loading false
  const [selectedAnime, setSelectedAnime] = useState(null); // State for selected anime

  useEffect(() => {
    if (query) {  // Ensure query is not empty before making the request
      setLoading(true);
      setSearchResults([]); // Clear previous results

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
      setSearchResults([]); // Clear results if query is empty
      setLoading(false);
    }
  }, [query]);

  const hasData =
    searchResults && Array.isArray(searchResults) && searchResults.length > 0;

  const handleCardClick = (animeId) => {
    console.log("Card clicked:", animeId); 
    setSelectedAnime(animeId); // Set the selected anime ID
  };

  return (
    <div className="relative bg-cover bg-center h-full p-3" style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images5.alphacoders.com/135/thumb-1920-1355115.jpeg')" 
      }}>
      <h1 className='text-white p-5 text-3xl font-semibold'>{query}</h1>
      
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : hasData ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {searchResults.map((anime) => (
            <Card 
              key={anime.id} 
              title={anime.title} 
              image={anime.image} 
              onClick={() => handleCardClick(anime.id)} // Pass anime ID on click
            />
          ))}
        </div>
      ) : (
        !loading && query && <div className="text-white text-lg">No results found</div>
      )}

      {/* Conditionally render the Details component if an anime is selected */}
      {selectedAnime && <Details anime={selectedAnime} />}
    </div>
  );
};

export default Search;
