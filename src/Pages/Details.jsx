// import React, { useState , useEffect } from 'react'

// const Details = ({anime}) => {

//   console.log(anime)
  
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch(`https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/info/${anime}`)
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, [anime]);

//   if (!data) {
//     return null;
//   }

//   console.log(data);
//   return (
//     <div  className="p-6 ">
//       <div  className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
//         <div className="flex-shrink-0">
//           <img
//             width={250}
//             height={350}
//             alt={data.title}
//             src={data.image}
//             className="rounded-lg shadow-lg"
//           />
//         </div>
//         <div className="flex flex-col space-y-4">
//           <h2 className="text-2xl font-bold text-white">{data.title}</h2>
//           <h2 className="text-lg text-gray-400">
//             {data.status} | {data.type} | {data.genres.join(", ")}
//           </h2>
//           <div
            
//             className="max-h-48 overflow-y-auto text-gray-300"
//           >
//             <h2
//               dangerouslySetInnerHTML={{
//                 __html: data.description || "No description available",
//               }}
//             ></h2>
//           </div>
//         </div>
//       </div>
//       <div id="episodes" className="mt-8">
//         <h2 className="text-xl font-semibold text-white">
//           Episodes ({data.totalEpisodes})
//         </h2>
//         <div className="episodelist-container mt-4">
//           <div
//             id="episodelist"
//             className="scroll-x flex space-x-4 overflow-x-auto py-2"
//           >
//             {data.episodes.map((ep) => (
//               <div
//                 className="episode-box bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
//                 key={ep.id}
//               >
//                 <a
//                   href={`/watch/${anime}/${ep.id}`}
//                   rel="noopener noreferrer"
//                   className="text-white"
//                 >
//                   <h2 className="episode-title text-lg font-medium">
//                     Episode {ep.number}
//                   </h2>
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
  
// }

// export default Details
import React, { useState, useEffect } from 'react';

const Details = ({ anime }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/info/${anime}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [anime]);

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              width={250}
              height={350}
              alt={data.title}
              src={data.image}
              className="rounded-lg shadow-xl transition-transform transform hover:scale-105"
            />
          </div>
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">{data.title}</h2>
            <h2 className="text-xl text-gray-400">
              {data.status} | {data.type} | {data.genres.join(", ")}
            </h2>
            <div className="max-h-48 overflow-y-auto text-gray-300">
              <h2
                dangerouslySetInnerHTML={{
                  __html: data.description || "No description available",
                }}
                className="leading-relaxed"
              ></h2>
            </div>
          </div>
        </div>
        <div id="episodes" className="mt-12">
          <h2 className="text-2xl font-semibold">Episodes ({data.totalEpisodes})</h2>
          <div className="episodelist-container mt-6">
            <div
              id="episodelist"
              className="scroll-x flex space-x-6 overflow-x-auto py-4"
            >
              {data.episodes.map((ep) => (
                <div
                  className="episode-box bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors shadow-lg"
                  key={ep.id}
                >
                  <a
                    href={`/watch/${anime}/${ep.id}`}
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <h2 className="episode-title text-lg font-bold">
                      Episode {ep.number}
                    </h2>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
