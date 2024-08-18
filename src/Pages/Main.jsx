// import React, { useState, useEffect } from 'react';
// import Card from '../components/Card';
// import Navbar from '../components/Navbar';
// import Hero from '../components/Hero';
// // import Hero from '../components/Hero';

// const Main = () => {
//   const [animeData, setAnimeData] = useState([]);



  
//   useEffect(() => {
//     async function getAnimeData() {
//       try {
//         const res = await fetch(
//           `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/popular`,
//           { cache: "no-store" }
//         );
//         const data = await res.json();
//         setAnimeData(data.results);
//       } catch (error) {
//         console.error('Error fetching anime data:', error);
//       }
//     }

//     getAnimeData();
//   }, []);



  
//   return (
//     <div  className="relative bg-cover bg-center h-full p-4"
//     style={{ 
//       backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images5.alphacoders.com/135/thumb-1920-1355115.jpeg')" 
//     }}>
          

//       <div>
//         <h1 className='text-white font-semibold text-4xl p-4'>Popular</h1>
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
//           {animeData.map((anime) => (
          
//             <Card 
//               key={anime.id} 
//               title={anime.title} 
//               image={anime.image} 
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Main;





import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Details from './Details';

const Main = () => {
  const [animeData, setAnimeData] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null); // To store the selected anime title

  useEffect(() => {
    async function getAnimeData() {
      try {
        const res = await fetch(
          `https://api-consumet-org-gamma-sage.vercel.app/anime/gogoanime/popular`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setAnimeData(data.results);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    }

    getAnimeData();
  }, []);

  const handleCardClick = (anime) => {
    console.log("Card clicked:", anime); 
    setSelectedAnime(anime);
  };
  

  return (
    <div className="relative bg-cover bg-center h-full p-4"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images5.alphacoders.com/135/thumb-1920-1355115.jpeg')" 
      }}>
      
      {!selectedAnime ? (
        <div>
          <h1 className='text-white font-semibold text-4xl p-4'>Popular</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {animeData.map((anime) => (
              <Card 
                key={anime.id} 
                title={anime.title} 
                image={anime.image}
                onClick={() => handleCardClick(anime.id)} // Handle card click
              />
            ))}
          </div>
        </div>
      ) : (
        <Details anime={selectedAnime} /> // Render the Anime component when a card is clicked
      )}
    </div>
  );
}

export default Main;
