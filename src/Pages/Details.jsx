// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import Preloader from './Preloader';

// const Details = () => {
//   const { anime } = useParams(); 
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/info/${anime}`);
//         const data = await res.json();
//         setData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }

      
//       setTimeout(() => {
//         setLoading(false);
//       }, 1500);
//     };

//     fetchData();
//   }, [anime]);

//   if (loading) {
//     return <Preloader />; // Show the loader while loading
//   }

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-b from-black via-gray-900 to-black text-white">
//       <div className="container mx-auto">
//         <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
//           <div className="flex-shrink-0">
//             <img
//               width={250}
//               height={350}
//               alt={data.title}
//               src={data.image}
//               className="rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 ease-in-out"
//             />
//           </div>
//           <div className="flex flex-col space-y-6">
//             <h2 className="text-4xl font-bold tracking-wider border-b-4 border-indigo-500 pb-2">{data.title}</h2>
//             <h2 className="text-lg text-gray-300">
//               <span className="inline-block px-2 py-1 bg-indigo-600 rounded-lg">{data.status}</span> | {data.type} | {data.genres.join(", ")}
//             </h2>
//             <div className="max-h-48 overflow-y-auto text-gray-400 bg-gray-800 p-4 rounded-lg shadow-inner">
//               <h2
//                 dangerouslySetInnerHTML={{
//                   __html: data.description || "No description available",
//                 }}
//                 className="leading-relaxed text-sm"
//               ></h2>
//             </div>
//           </div>
//         </div>
//         <div id="episodes" className="mt-12">
//           <h2 className="text-2xl font-semibold text-indigo-400">Episodes ({data.totalEpisodes})</h2>
//           <div className="episodelist-container mt-6">
//             <div
//               id="episodelist"
//               className="flex space-x-4 overflow-x-auto py-4 bg-gray-800 p-4 rounded-lg shadow-inner"
//             >
//               {data.episodes.map((ep) => (
//                 <Link
//                  to={`/watch/${anime}/${ep.id}`}
//                 >
//                   <div
//                     className="episode-box bg-gray-700 rounded-lg p-4 hover:bg-indigo-600 transition-colors shadow-lg cursor-pointer transform hover:scale-105"
//                   >
//                     <h2 className="episode-title text-lg font-bold text-center text-white">
//                       Episode {ep.number}
//                     </h2>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;


import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Preloader from './Preloader';

const Details = () => {
  const { anime } = useParams(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [episodeSegments, setEpisodeSegments] = useState([]);
  const [currentSegment, setCurrentSegment] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/info/${anime}`);
        const data = await res.json();
        setData(data);
        
        // Divide episodes into segments of 100
        const segments = [];
        for (let i = 0; i < data.episodes.length; i += 100) {
          segments.push(data.episodes.slice(i, i + 100));
        }
        setEpisodeSegments(segments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    fetchData();
  }, [anime]);

  if (loading) {
    return <Preloader />; // Show the loader while loading
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              width={250}
              height={350}
              alt={data.title}
              src={data.image}
              className="rounded-lg shadow-2xl transform hover:scale-110 transition-transform duration-300 ease-in-out"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl font-bold tracking-wider border-b-4 border-indigo-500 pb-2">{data.title}</h2>
            <h2 className="text-lg text-gray-300">
              <span className="inline-block px-2 py-1 bg-indigo-600 rounded-lg">{data.status}</span> | {data.type} | {data.genres.join(", ")}
            </h2>
            <div className="max-h-48 overflow-y-auto text-gray-400 bg-gray-800 p-4 rounded-lg shadow-inner">
              <h2
                dangerouslySetInnerHTML={{
                  __html: data.description || "No description available",
                }}
                className="leading-relaxed text-sm"
              ></h2>
            </div>
          </div>
        </div>
        <div id="episodes" className="mt-12">
          <h2 className="text-2xl font-semibold text-indigo-400">Episodes ({data.totalEpisodes})</h2>

          {/* Dropdown to select episode segment */}
          {episodeSegments.length > 1 && (
            <div className="mb-6">
              <label htmlFor="episode-segment" className="text-lg font-medium">
                Select Episode Range:
              </label>
              <select
                id="episode-segment"
                className="ml-2 p-2 rounded bg-gray-800 text-white"
                value={currentSegment}
                onChange={(e) => setCurrentSegment(parseInt(e.target.value))}
              >
                {episodeSegments.map((_, index) => (
                  <option key={index} value={index}>
                    Episodes {index * 100 + 1} - {Math.min((index + 1) * 100, data.totalEpisodes)}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="episodelist-container mt-6">
            <div
              id="episodelist"
              className="flex space-x-4 overflow-x-auto py-4 bg-gray-800 p-4 rounded-lg shadow-inner"
            >
              {episodeSegments[currentSegment].map((ep) => (
                <Link
                  to={`/watch/${anime}/${ep.id}`}
                  key={ep.id}
                >
                  <div className="episode-box bg-gray-700 rounded-lg p-4 hover:bg-indigo-600 transition-colors shadow-lg cursor-pointer transform hover:scale-105">
                    <h2 className="episode-title text-lg font-bold text-center text-white">
                      Episode {ep.number}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
